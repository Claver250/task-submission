const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendAdminSubmissionNotification = async ({ adminEmail, userEmail, taskTitle}) => {
    await transporter.sendMail({
        to: adminEmail,
        subject: 'New Task Submission',
        html: `
        <p>A new task has been submitted.</p>
        <p><b>User:</b> ${userEmail}</p>
        <p><b>Task:</b> ${taskTitle}</p>`
    })
};

exports.sendSubmissionReceiveEmail = async ({ userEmail, taskTitle}) => {
    try{
        await transporter.sendMail({
            from: '"Task System" <no-reply@tasks.com',
            to: userEmail,
            subject: 'Submission Received',
            html: `
            <p>Your submission for task <b>${taskTitle}</b> has been received </p>
            <p>Status: <b>SUBMITTED</b></p>
            <p>Good luck`
        });
    }catch(error){
        console.log('Email failed:', error.message);
    }
};