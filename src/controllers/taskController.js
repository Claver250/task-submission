const {Task} = require('../models');
const {taskSchema} = ('../validators/taskValidate')

exports.createTask = async (req, res) => {
    try{
        const {title, description, deadline, track, requirements} = req.body;
        const existingTask = await Task.findOne({where: {title}});
        if(existingTask){
            return res.status(409).json({message: 'Task with this title already exists'});
        }
        const task = await Task.create({
            title,
            description,
            deadline,
            track,
            requirements
        });
        return res.status(201).json({
            message: 'Task created successfully',
            data:task
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getAllTasks = async (req, res) => {
    try{
        const {limit, offset} = req.query
        const {rows, count} = await Task.findAndCountAll({
            limit,
            offset,
            order: [['createdAt','DESC',]]
        });
        return res.status(200).json({
            message: 'Tasks retrieved successfully',
            count,
            limit,
            offset,
            results: rows.length,
            data: rows
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getMyTask = async (req, res) => {
    try{
        const{limit, offset} = req.query;
        const sortBy = req.query.sortBy || 'createdAt'; 
        const order = req.query.order || 'DESC';
        const userTrack = req.user.track;
        const {rows: tasks, count} = await Task.findAndCountAll({
            where: {
                track: userTrack
            },
            limit,
            offset,
            order: [[sortBy, order]]
        });
        res.status(200).json({
            message: 'Task retrieved successfully',
            count,
            limit,
            offset,
            sortBy,
            order,
            data: tasks
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};