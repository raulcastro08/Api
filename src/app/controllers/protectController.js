const express = require('express')
const althmiddleware = require('../middleware/auth')

const router = express.Router();
const Project = require('../models/project')
const Task = require('../models/task')

router.use(althmiddleware);

router.get('/', async (req, res) => {

    try {
        const projects = await Project.find().populate('user');
        return res.send({ projects })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading the project' });
    }

});

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('user');
        return res.send({ project })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading project' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        const project = await Project.create({ title, description, user: req.userId });
        await Promisse.all(tasks.map(async  task => {
            const projectTask = new Task({ ...task, project: project._id });

            projectTask.save();
            project.task.push(project.Task);
        }));
        await project.save();
        return res.send({ project })

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Error creating new project' });

    }
});

router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});

router.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId);

        return res.send('User Deleted');
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project' });
    }
});

module.exports = app => app.use('/projects', router);
