const workoutService = require('../services/workoutService');

const getAllWorkouts = (req, res) => {
    const {mode} = req.query;
    const {limit} = req.query;
    const {sort} = req.query;
    try {
        //const allWorkouts = workoutService.getAllWorkouts()
        const allWorkouts = workoutService.getAllWorkouts({ mode,limit, sort})
        res.send({status: 'OK', data: allWorkouts})
    } catch (error) {
        res.status(error?.status || 500)
        .send({ status: 'FAILED', data: {error: error?.message || error}})
    }
}

const getAllRecords = (req, res) => {
    console.log('Ha entrado en el controller');
    
    const {limit} = req.query;
    try {
        //const allWorkouts = workoutService.getAllWorkouts()
        const allRecords = workoutService.getAllRecords({ limit})
        res.send({status: 'OK', data: allRecords})
    } catch (error) {
        res.status(error?.status || 500)
        .send({ status: 'FAILED', data: {error: error?.message || error}})
    }
}

const getOneWorkout = (req, res) => {
    const {
        params: {workoutId},
    } = req
    if (!workoutId) {
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'Parameter ":workoutId" can not be empty'}
        })
        return
    }
    try {
        const workout = workoutService.getOneWorkout(workoutId)
        res.send({status: 'OK', data: workout})
    }  catch(error) {
        res.status(error?.status || 500)
        .send({status: 'FAILED',data: {error: error?.message || error}})
    }
    
}

const getOneRecord = (req, res) => {
    const {
        params: {recordId},
    } = req
    if (!recordId) {
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'Parameter ":recordId" can not be empty'}
        })
        return
    }
    try {
        const record = workoutService.getOneRecord(recordId)
        res.send({status: 'OK', data: record})
    }  catch(error) {
        res.status(error?.status || 500)
        .send({status: 'FAILED',data: {error: error?.message || error}})
    }
    
}

const createNewWorkout = (req, res) => {
    try {
        const {body} = req
        if (
            !body.name ||
            !body.mode ||
            !body.equipment ||
            !body.exercises ||
            !body.trainerTips
        ) {
            res.status(400)
            .send({
                status: 'FAILED',
                data: {error: "Parameters in body can not be empty"}
            })
            
        }
    const newWorkout = {
        name : body.name,
        mode : body.mode,
        equipment : body.equipment,
        exercises : body.exercises,
        trainerTips : body.trainerTips,
    };
    const createdWorkout = workoutService.createNewWorkout(newWorkout)
    res.status(201).send({status: 'OK',data: createdWorkout})
    } catch (error) {
        res.status(error?.status || 500)
        .send({status: 'FAILED', data: {error: error?.message || error}})
    }
    
}

const createNewRecord = (req, res) => {
    try {
        const {body} = req
        if (
            !body.workout ||
            !body.record
        ) {
            res.status(400)
            .send({
                status: 'FAILED',
                data: {error: "Parameters in body can not be empty"}
            })
            
        }
    const newRecord = {
        workout : body.workout,
        record : body.record,
        
    };
    const createdRecord = workoutService.createNewRecord(newRecord)
    res.status(201).send({status: 'OK',data: createdRecord})
    } catch (error) {
        res.status(error?.status || 500)
        .send({status: 'FAILED', data: {error: error?.message || error}})
    }
    
}

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: {workoutId},
     } = req;
     if (!workoutId) {
            res.status(400)
            .send({
                status: 'FAILED',
                data: { error: 'Parameter ":workoutId can not be empty'}
            })
        }
        try {
            const updatedWorkout = workoutService.updateOneWorkout(workoutId,body)
            res.send({status: 'OK', data: updatedWorkout})
        } catch (error) {
            res.status(error?.status || 500)
            .send({status: 'FAILED', data: {error: error?.message || error}})
        }
    }


const deleteOneWorkout = (req, res) => {
    const {
        params: {workoutId},
    } = req
    if (!workoutId) {
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'Parameter ":workoutId" can not be empty'}
        })
        return
    }
    try {
        const deleteOneWorkout = workoutService.deleteOneWorkout(workoutId)
        res.status(204).send({status: 'OK', data: deleteOneWorkout})
    } catch(error) {
        res.status(error?.status || 500)
        .send({status: 'FAILED',data: {error: error?.message || error}})
    }
}

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