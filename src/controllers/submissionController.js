const { count } = require('console');
require('dotenv').config();
const {Submission} = require('../models');
const {Task} = require('../models');
const {User} = require('../models');
const { TRACKS } = require('../constants/track');
const submissionService = require('../services/submission.service');
const cache = require('../utils/cache');

exports.createSubmission = async (req, res) => {
    try {
        const {taskId, submissionLink} = req.body;
        const userId = req.user.id;
        const existingSubmission = await Submission.findOne({
            where: {
                userId,
                taskId
            }
        });
        if(existingSubmission) return res.status(409).json({ message: 'You have already submitted this task'});
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }
        const now = new Date();
        const deadline = new Date(task.deadline);
        let submissionStatus = 'submitted';
        
        if (task.deadline && now > deadline) {
            submissionStatus = 'late';
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const submission = await Submission.create({
            taskId,
            userId,
            submissionLink,
            status: submissionStatus,
            
        });
        return res.status(201).json({
            message: submissionStatus === 'late' ? 'Submission created (marked as late)' :
            'Submission created successfully',
            data: submission
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.submitTask = async (req, res) => {
    try{
        console.log("User from Auth Middleware:", req.user);
        await submissionService.submitSubmission({
            submissionId: req.params.id || req.body.submissionId,
            user: req.user
        });
        return res.status(200).json({message: 'Submisssion submitted Successfully'})
    }catch(error){
        console.log(error);
        return res.status(400).json({ message: error.message}); 
    }
};

exports.getAllSubmissions = async (req, res) => {
    try{
        const {limit, offset, sortBy = 'createdAt', order = 'DESC'} = req.query;
        const userId = req.user.id;
        const userRole = req.user.role;
        const filter = userRole === 'admin' ? {} : { userId };
        const taskFilter = TRACKS ? { TRACKS } : {};
        const {rows, count} = await Submission.findAndCountAll({
            where: filter,
            include: [
                { 
                    model: Task,
                    as: 'task', 
                    where: taskFilter, 
                    attributes: ['title', 'track'] 
                },
                { 
                    model: User, 
                    as: 'user',
                    attributes: ['name', 'email'] 
                }
            ],
            limit,
            offset,
            order: [[sortBy, order]]
        });
        return res.status(200).json({
            message: 'Submissions retrieved successfully',
            count,
            limit,
            offset,
            sortBy,
            order,
            data: rows
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getMySubmission = async (req, res) => {
    try{
        const {limit, offset, sortBy = 'createdAt', order = 'DESC', track} = req.query;
        const userId = req.user.id;
        const userRole = req.user.role;
        const cacheKey = `submissions_${userId}_${limit}_${offset}_${sortBy}_${order}_${track || 'all'}`;
        const cachedResponse = cache.get(cacheKey);
        if(cachedResponse){
            return res.status(200).json({
                message: 'Submission received from cache',
                ...cachedResponse
            });
        }
        const {rows, count} = await Submission.findAndCountAll({
            // where: {userId: userId},
            include: [{ 
                model: Task,
                as: 'task', 
                attributes: ['title', 'track'] 
            },
            {
                model: User,
                as: 'user',
                attributes: ['name', 'email']
            }
        ],
            limit,
            offset,
            order: [[sortBy, order]]
        });
        // if (userRole !== 'admin' && submission.userId !== userId) {
        //     return res.status(403).json({ 
        //         message: 'Forbidden: You do not have permission to view this submission' 
        //     });
        // }
        const finalData = {
            count,
            limit,
            offset,
            sortBy,
            order,
            data: rows
        }
        return res.status(200).json({
            message: 'Submission retrieved successfully',
            ...finalData
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.updateSubmissionStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const submission = await Submission.findByPk(id);
        if(!submission) return res.status(404).json({message: 'Submission not found'});
        submission.status = status;
        await submission.save();
        return res.status(200).json({
            message: 'Submission status updated successfully',
            data: submission
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.deleteSubmission = async (req, res) => {
    try{
        const {id} = req.params;
        const submission = await Submission.findByPk(id);
        if(!submission) return res.status(404).json({message: 'Submission not found'});
        if (submission.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ 
                message: 'Forbidden: You can only delete your own submissions' 
            });
        }
        if (submission.status !== 'submitted' && req.user.role !== 'admin') {
            return res.status(400).json({ 
                message: 'Cannot delete a submission that is already under review or processed' 
            });
        }
        await submission.destroy();
        return res.status(200).json({message: 'Submission deleted successfully'});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};