const adaptador = require('../database/adaptador.js')
const { v4: uuid } = require("uuid");


const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = adaptador.getAllWorkouts(filterParams)
        return allWorkouts
    } catch (error) {
        throw error
    }
    
};

const getAllRecords = (filterParams) => {
    try {
        const allRecords = adaptador.getAllRecords(filterParams)
        return allRecords
    } catch (error) {
        throw error
    }
    
};

const getOneWorkout = (id) => {
    try {
        const workout = adaptador.getOneWorkout(id)
        return workout
    } catch (error) {
        throw error
    } 
    
};

const getOneRecord = (id) => {
    try {
        const record = adaptador.getOneRecord(id)
        return record
    } catch (error) {
        throw error
    } 
    
};

const createNewWorkout = (newWorkout) => {
    try {
        const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        }
        const createdWorkout = adaptador.createWorkout(workoutToInsert)
        return createdWorkout;
    } catch (error) {
        throw error
    }
    
};

const createNewRecord = (newRecord) => {
    try {
        const recordToInsert = {
        ...newRecord,
        id: uuid(),
        }
        const createdRecord = adaptador.createdRecord(recordToInsert)
        return createdRecord;
    } catch (error) {
        throw error
    }
    
};

const updateOneWorkout = (workoutId, changes) => {
    try {
        const updatedWorkout = adaptador.updateOneWorkout(workoutId, changes)
        return updatedWorkout
    } catch (error) {
        throw error
    }
};

const deleteOneWorkout = (id) => {
    try {
        const workout = adaptador.deleteOneWorkout(id)
        return workout
    } catch(error) {
        throw error;
    }
    
};



module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
    getAllRecords,
    getOneRecord,
    createNewRecord
}