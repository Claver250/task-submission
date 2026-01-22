const Task = require('../models/task');
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
        const tasks = await Task.findAll();
        return res.status(200).json({
            message: 'Tasks retrieved successfully',
            data: tasks
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getTaskById = async (req, res) => {
    try{
        const{id} = req.params;
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({
            message: 'Task retrieved successfully',
            data: task
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};