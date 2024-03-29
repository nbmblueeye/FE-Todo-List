import { createAsyncThunk } from '@reduxjs/toolkit';
import taskAPI from '../api/taskApi';
import { TaskType } from '../../types/TaskType';


const getTasks = createAsyncThunk(

    "tasks/getTasks", async(slug:string, thunkAPI) => {
        try {
            const response = await taskAPI.getTasks(slug);
            return response.data; 
        } catch (error:any) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
    
);

const createTask = createAsyncThunk(

    "tasks/createTask", async(task:TaskType, thunkAPI) => {
        try {
            const response = await taskAPI.postTask(task);
            return response.data;
        } catch (error:any) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
    
);

const getTask = createAsyncThunk(

    "tasks/getTask", async(id:string, thunkAPI) => {
        try {
            const response = await taskAPI.getTask(id);
            return response.data;
        } catch (error:any) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
    
);

const editTask = createAsyncThunk(

    "tasks/editTask", async({id, data}:{id:string, data:TaskType}, thunkAPI) => {
        try {
            const response = await taskAPI.putTask(id, data);
            return response.data;
        } catch (error:any) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
    
);

const deleteTask = createAsyncThunk(

    "tasks/deleteTask", async(id:string, thunkAPI) => {
        try {
            const response = await taskAPI.deleteTask(id);
            return response.data;
        } catch (error:any) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
    
);


export { getTasks, createTask, getTask, editTask, deleteTask }

