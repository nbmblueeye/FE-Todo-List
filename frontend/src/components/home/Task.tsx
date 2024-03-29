import { RxCross2 } from "react-icons/rx";
import {TaskHeader,  RoundLoadingButton} from "../index";
import { TaskType } from "../../types/TaskType";
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { deleteTask } from "../../features/services/taskService";
import { useEffect, useState } from "react";
import { reset } from "../../features/sliders/taskSlider";
import { useNavigate } from "react-router-dom";

type taskContentProps = {
    title: string, 
    description:string,
}

type Props = {
    taskData: TaskType
}

const TaskContent = ({title, description}:taskContentProps) => {
    return(
        <div className="flex flex-col">
            <h3 className="text-lg font-medium text-black-100 mb-2">{title}</h3>
            <p className="text-base font-regular text-black-200">{description}</p>
        </div>
    )
}
const Task = ({taskData}: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector(state => state.task);
    const [ deletedTask, setDeletedTask ] = useState<string | null>(null);

    const deleteTaskHandler = (id:string | undefined) => {
        if(id && id != ""){
            dispatch(deleteTask(id));
            setDeletedTask(id);
        }
    }
    
    useEffect(() => {
        if(isSuccess) {
            setDeletedTask(null);
            setTimeout(() => {
                dispatch(reset());
            }, 1000);
        }
    }, [isSuccess]);


  return (
    <Tooltip title="Double click to edit Task" placement="right" arrow>
        <div className="mb-8 p-4 bg-white-100 border border-tertiary shadow-xl rounded-md cursor-pointer relative hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-blue-500" onDoubleClick={() => navigate(`edit-task/${taskData?._id}`)}> 
            <RoundLoadingButton activeTask={taskData?._id} btnType="button" bgColor="bg-black-100" textColor="text-blue-500" icon={<RxCross2/>} loadingText="" buttonFunc={() => deleteTaskHandler(taskData?._id)} loading={deletedTask}/>
            <TaskHeader taskData={taskData}/>
            <TaskContent title={taskData.title} description={taskData.description}/>
        </div>
    </Tooltip>
  )
}

export default Task
