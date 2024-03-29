import { DateField, LocalizationProvider } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react"
import { Checkbox, FormControlLabel } from "@mui/material";
import { TaskType } from "../../types/TaskType";
import { useAppDispatch } from "../../features/hook";
import { editTask } from "../../features/services/taskService";

type Props = {
    taskData: TaskType
}

const TaskHeader = ({taskData}:Props ) => {
 
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(taskData.status)
    }, [taskData])
    
    const statusHandler = (e:React.ChangeEvent<HTMLInputElement>) => {   
        if(taskData._id){
            const data = {
                title:taskData.title,
                description:taskData.description,
                status: e.currentTarget.checked,
                deadline: taskData.deadline,
            }
            dispatch(editTask({id:taskData._id, data:data}));
            setStatus(prevStatus => !prevStatus);
        }
    }

    return (
        <div className="mb-4 flex flex-row gap-8 items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField label="Deadline" defaultValue={dayjs(taskData.deadline)} format="LL"/>
            </LocalizationProvider>
            <FormControlLabel control={<Checkbox 
                checked={status}
                onChange={(e) => statusHandler(e)}
                inputProps={{ 'aria-label': 'controlled' }}
            />} label={`${status ? "Completed":"Pending"}`}/>
        </div>   
    )
}

export default TaskHeader