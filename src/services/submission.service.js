const { Submission, Task} = require('../models');
const emailService = require('./email.service');

exports.submitSubmission = async ({submissionId, user}) => {
    const submission = await Submission.findOne({
        where: {
            id: submissionId, 
            // userId: user.id
        },
        include: [{
            model: Task,
            as: 'task' 
        }]
    });
    if (!submission) throw new Error('Submission not found');
    if (submission.status === 'submitted') throw new Error('Already submitted');
    submission.status = 'submitted';
    submission.submittedAt = new Date();
    submission.save();

    emailService.sendSubmissionReceiveEmail({
        userEmail: user.email,
        taskTitle: submission.Task.title
    });

    emailService.sendAdminSubmissionNotification({
        adminEmail: process.env.ADMIN_EMAIL,
        userEmail: user.email,
        taskTitle: Submission.Task.title
    });

    return submission;
};