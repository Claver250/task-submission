const { count } = require('console');
const Submission = require('../models/submission');
const Task = require('../models/task');
const User = require('../models/user');
const { TRACKS } = require('../constants/track');

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

exports.getAllSubmissions = async (req, res) => {
    try{
        const filter = userRole === 'admin' ? {} : { userId };
        const taskFilter = track ? { track } : {};
        const Submissions = await Submission.findAll({
            where: filter,
            include: [
                { 
                    model: Task, 
                    where: taskFilter, 
                    attributes: ['title', 'track'] 
                },
                { 
                    model: User, 
                    attributes: ['name', 'email'] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({
            message: 'Submissions retrieved successfully',
            count: Submissions.length,
            data: Submissions
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getSubmissionById = async (req, res) => {
    try{
        const {id} = req.params
        const userId = req.user.id;
        const userRole = req.user.role;
        const submission = await Submission.findByPk(id, {
            include: [{ model: Task, attributes: ['title', 'track'] }]
        });
        if(!submission) return res.status(404).json({message: 'Submission not found'});
        if (userRole !== 'admin' && submission.userId !== userId) {
            return res.status(403).json({ 
                message: 'Forbidden: You do not have permission to view this submission' 
            });
        }
        return res.status(200).json({
            message: 'Submission retrieved successfully',
            data: submission
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