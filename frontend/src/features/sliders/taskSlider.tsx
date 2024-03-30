import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, editTask, getTask, getTasks } from "../services/taskService";
import { TaskType } from "../../types/TaskType";
import { arrayMove } from "@dnd-kit/sortable";


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

type DragIndex = {
  activeId: string,
  overId: string
}


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
      },
      setTasks:(state, action: PayloadAction<DragIndex>) => {
          const oldIndex = state.tasks.findIndex((task) => task.id === action.payload.activeId);
          const newIndex = state.tasks.findIndex((task) => task.id === action.payload.overId);
          state.tasks = arrayMove(state.tasks, oldIndex, newIndex);
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
          state.isLoading = true;
        }),
        builder.addCase(getTasks.fulfilled, (state, action:any) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.tasks = action.payload.map((task:any) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            deadline: task.deadline,
          })
          );
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
          state.tasks = [...state.tasks, {
            id:action.payload.newTask._id,
            title: action.payload.newTask.title, 
            description: action.payload.newTask.description, 
            deadline: action.payload.newTask.deadline, 
            status:action.payload.newTask.status
          }];
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
          state.tasks = state.tasks.filter(task => task.id != action.payload.id)
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
            id:action.payload.id,
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
          state.isLoading = false;
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

export const { reset, filter, setTasks } = taskSlide.actions;

export default taskSlide.reducer;