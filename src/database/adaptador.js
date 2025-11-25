const { json } = require('body-parser');
const fs = require("fs");
const DB = require('./db.json');
const { log } = require('console');

const getAllWorkouts = (filterParams) => {
    try {
        //return DB.workouts;
        let workouts = [];
        DB.workouts.forEach((workout) => {
            workouts.push(workout)
        })
        console.log(workouts[0]);
        
        if (filterParams.sort) {
            
            workouts = workouts.sort((a,b)  => new Date(a.createdAt) - new Date(b.createdAt))
            console.log(filterParams.sort);
            
            if (filterParams.sort == 'desc') {
                console.log('desc');
                
                workouts = workouts.reverse()
                
            }
            
            
        }
        
        if (filterParams.mode) {
            workouts = workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode))
        }
        if (filterParams.limit) {
            let workoutsLimitados = []
            for (let i = 0; i < filterParams.limit; i++) {
                workoutsLimitados.push(workouts[i])
            }

            workouts = workoutsLimitados
            
        }
        
        return workouts;
    } catch (error) {
        throw {status: 500, message: error}
    }
};

const getAllRecords = (filterParams) => {
    console.log('Ha entrado en el adaptador');
    
    try {
        //return DB.workouts;
        let records = [];
        DB.records.forEach((record) => {
            records.push(record)
        })
        console.log(records[0]);
        
        
        if (filterParams.limit) {
            let recordsLimitados = []
            for (let i = 0; i < filterParams.limit; i++) {
                recordsLimitados.push(records[i])
            }

            records = recordsLimitados
            
        }
        
        return records;
    } catch (error) {
        throw {status: 500, message: error}
    }
};

const getOneWorkout = (id) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === id);
        if (!workout) {
            throw {
                status: 400,
                message: `Can't find workout with the id ${id}`
            }
        }
        return workout
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
};

const getOneRecord = (id) => {
    try {
        const record = DB.records.find((record) => record.id === id);
        if (!record) {
            throw {
                status: 400,
                message: `Can't find record with the id ${id}`
            }
        }
        return record
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
};

const createWorkout = (newWorkout) => {
    try {

        const workoutRepetido = DB.workouts.find((workout) => workout.id === newWorkout.id)
        if (workoutRepetido) {
           throw {
            status: 400,
            message: `The workout with Id ${newWorkout.id} is already added`
           }
        }
        console.log(newWorkout);
    
        DB.workouts.push(newWorkout)
        saveToDatabase(DB)
        return newWorkout;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
};

const createdRecord = (newRecord) => {
    try {

        const recordRepetido = DB.records.find((record) => record.id === newRecord.id)
        if (recordRepetido) {
           throw {
            status: 400,
            message: `The record with Id ${newRecord.id} is already added`
           }
        }
        console.log(newRecord);

        const workoutExiste = DB.workouts.find((workout) => workout.id === newRecord.workout)
        if (!workoutExiste) {
           throw {
            status: 400,
            message: `The workout with Id ${newRecord.workout} doesn't exists`
           }
        }
        console.log(newRecord);
    
        DB.records.push(newRecord)
        saveToDatabase(DB)
        return newRecord;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
};

const saveToDatabase = (DB) => {
    fs.writeFileSync('./src/database/db.json', JSON.stringify(DB,null,2), {
        encoding: "utf8"
    })
}

const deleteOneWorkout = (id) => {
    try {
        const deletedWorkout = DB.workouts.find((workout) => workout.id === id);
        if (!deletedWorkout) {
            throw {
                status: 400,
                message: `Can't find workout with the id ${id}`
            }
        }
        let index = DB.workouts.indexOf(deletedWorkout)
        console.log(index);
    
        DB.workouts.splice(index,1)
        saveToDatabase(DB)
        return deletedWorkout;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
        
    }
    
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout with the name ${changes.name} already exists`,

            }
        }
            const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId)
        
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find workout with id ${workoutId}`
            }
        }
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updateAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        }
        DB.workouts[indexForUpdate] = updatedWorkout
        saveToDatabase(DB)
        return updatedWorkout;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteOneWorkout,
    updateOneWorkout,
    getAllRecords,
    getOneRecord,
    createdRecord
}