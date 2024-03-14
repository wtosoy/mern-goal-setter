const { response } = require('express');
const Goal = require('../models/Goal');
const errorHandler = require('../utilities/errorHandler');


const getAllGoals = async (request, response, next) => {
    try {
        const goals = await Goal.find({ userId: request.user.user_id });
        if (goals.length === 0) return response.status(200).json({ message: 'No goals yet' });
        response.json(goals);
    } catch (error) {
        next(error);
    }
};


const createGoal = async (request, response, next) => {
    try {
        const { title, description } = request.body;

        if (!title) throw errorHandler(400, 'Title is required');

        const newGoal = await Goal.create({
            userId: request.user.user_id,
            title,
            description,
        });

        if (!newGoal) throw errorHandler(400, 'Something went wrong');

        return response.status(201).json(newGoal);        
    } catch (error) {
        next(error);
    }
};

const updateGoal = async (request, response, next) => {
    try {
        const { title, description, completed } = request.body;

        const goal = await Goal.findById(request.params.id);

        if (!goal) throw errorHandler(404, 'Goal not found');
        if (goal.userId.toString() !== request.user.user_id) throw errorHandler(403, 'Forbidden');

        goal.title = title || goal.title;
        goal.description = description || goal.description;
        goal.completed = completed ?? goal.completed;

        await goal.save();
        return response.status(200).json(goal);
    } catch (error) {
        next(error);
    }
};


const deleteGoal = async (request, response, next) => {
    try {
        const goal = await Goal.findById(request.params.id);

        if (!goal) throw errorHandler(404, 'Goal not found');
        if (goal.userId.toString() !== request.user.user_id) throw errorHandler(403, 'Forbidden');

        await goal.deleteOne();
        return response.status(200).json({ message: 'Goal deleted' });
    } catch (error) {
        next(error);
    }
};


module.exports = { getAllGoals, createGoal, updateGoal, deleteGoal };