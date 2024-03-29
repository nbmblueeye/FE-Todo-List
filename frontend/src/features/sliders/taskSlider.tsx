import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, editTask, getTask, getTasks } from "../services/taskService";
import { TaskType } from "../../types/TaskType";


type Props = {
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isUpdating: boolean,
    message:string,
    task:TaskType,
    tasks: TaskType[],
    filters: TaskType[],
}

const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    isUpdating: false,
    message:"",
    task:{} as TaskType,
    tasks: [],
    filters:[]
} as Props;


const taskSlide = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
      reset: (state) => {
        state.isError = false,
        state.isLoading = false,
        state.isSuccess = false,
        state.isUpdating = false,
        state.message = ""
      },
      filter: (state, action: PayloadAction<string> ) => {
        switch (action.payload) {
          case 'all':
              state.filters = state.tasks
            break;
          case 'completed':
              state.filters = state.tasks.filter(task => task.status == true)
            break;
            case 'pending':
              state.filters = state.tasks.filter(task => task.status == false)
            break;
          default:
            state.filters = state.tasks
            break;
        }
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(getTasks.fulfilled, (state, action:any) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.tasks = action.payload;
        }),
        builder.addCase(getTasks.rejected, (state, action:any) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }),

        builder.addCase(createTask.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(createTask.fulfilled, (state, action:any) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.tasks.push(action.payload.newTask);
          state.message = action.payload.message;
        }),
        builder.addCase(createTask.rejected, (state, action:any) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        }),

        builder.addCase(deleteTask.pending, () => {
          
        }),
        builder.addCase(deleteTask.fulfilled, (state, action:any) => {
          state.isError = false;
          state.isSuccess = true;
          state.message = action.payload.message;
          state.tasks = state.tasks.filter(task => task._id != action.payload.id)
        }),
        builder.addCase(deleteTask.rejected, (state, action:any) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        })

        builder.addCase(getTask.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(getTask.fulfilled, (state, action:any) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.task = {
            _id:action.payload._id,
            title: action.payload.title, 
            description: action.payload.description, 
            deadline: action.payload.deadline, 
            status:action.payload.status
          }
        }),
        builder.addCase(getTask.rejected, (state, action:any) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        }),

        builder.addCase(editTask.pending, (state) => {
          state.isUpdating = true
        }),
        builder.addCase(editTask.fulfilled, (state, action:any) => {
          state.isUpdating = false,
          state.isError = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }),
        builder.addCase(editTask.rejected, (state, action:any) => {
          state.isUpdating = false,
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        })

      },
})

export const { reset, filter } = taskSlide.actions;

export default taskSlide.reducer;