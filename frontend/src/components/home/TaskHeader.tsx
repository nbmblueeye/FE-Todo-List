import { DateField, LocalizationProvider } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../features/hook";
import { editTask } from "../../features/services/taskService";
import { TaskType } from "../../types/TaskType";

type Props = {
    taskData: TaskType
}

const TaskHeader = ({taskData}:Props ) => {
 
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(taskData.status);
    }, [taskData])

    const statusHandler = (e:React.ChangeEvent<HTMLInputElement>) => { 
        let editTaskData = { ...taskData, ...{status: e.currentTarget.checked}};
        dispatch(editTask(editTaskData));
        setStatus(prevStatus => !prevStatus);
    }

    return (
        <div className="w-full mb-4 flex flex-row gap-10 items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField label="Deadline" defaultValue={dayjs(taskData.deadline)} format="LL"/>
            </LocalizationProvider>
            <div className="flex items-center mb-4">
                <input id="status" type="checkbox" className="w-5 h-5 text-tertiary" checked={status} onChange={(e) => statusHandler(e)}/>
                <label htmlFor="status" className="ms-2 text-base text-tertiary dark:text-gray-300">{`${status ? "Completed":"Pending"}`}</label>
            </div>
        </div>   
    )
}

export default TaskHeader