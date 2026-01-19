const Submission = require('../models/submission');
const Task = require('../models/task');
const User = require('../models/user');

exports.createSubmission = async (req, res) => {
    try {
        const {task_id, user_id, submissionLink} = req.body;
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const submission = await Submission.create({
            task_id,
            user_id,
            submissionLink
        });
        return res.status(201).json({
            message: 'Submission created successfully',
            data: submission
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getSubmissionById = async (req, res) => {
    try{
        const {id} = req.params
        const submission = await submission.findByPk(id);
        if(!submission) return res.status(404).json({message: 'Submission not found'});
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
        await submission.destroy();
        return res.status(200).json({message: 'Submission deleted successfully'});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};