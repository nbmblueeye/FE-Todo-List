import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { createTask } from "../../features/services/taskService";
import { SquareButton , SelectDate } from "../../components";
import { TaskType } from "../../types/TaskType";
import { styles } from "../../constants";


const AddTask = () => {

    const dispatch = useAppDispatch();
    const { isLoading, isSuccess ,isError, message } = useAppSelector(state => state.task);

    const [form, setForm ] = useState<TaskType>({
        id:"",
        title:"",
        description:"",
        status: false,
        deadline: dayjs(new Date()).format(),
    });

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({...prevState,[name]:value}));
    }
    
    const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({...prevState,[name]:value}));
    }

    const pickDateHandler = (newValue:any) => {
        setForm(prevState => ({...prevState,deadline: newValue?.format('lll')}));
    }

    const addTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();     
        dispatch(createTask(form)); 
    }  

    useEffect(() => { 
        if(isSuccess) {
            setForm({
                id:"",
                title:"",
                description:"",
                status: false,
                deadline: dayjs(new Date()).format('lll'),
            })
        }
    }, [isSuccess])
    
  return (
    <div className={`${styles.container} p-4`}>  
        <form className={`w-full p-8 bg-white-100 ${styles.border}`} onSubmit={(e) => addTaskHandler(e)}>
            {
                message && 
                <div className={`p-4 mb-4 ${isSuccess && "bg-green-100"} ${isError && 'bg-red-100'}`}>
                    <p className={`font-normal text-[14px] ${isSuccess && "text-green-500"} ${isError && 'text-red-500'}`}>{message}</p>
                </div>
            }
           
           <div className="flex flex-col gap-6 mb-6">
                <div className="w-full">
                    <label htmlFor="title" className={`${styles.formLabel}`}>Task Title</label>
                    <input type="text" id="title" name="title" value={form.title} onChange={(e) => onInputChange(e)} className={`${styles.formInput}`} placeholder="Task title"/>
                </div>
                <div className="w-full">
                    <label htmlFor="description" className={`${styles.formLabel}`}>Task Description</label>
                    <textarea id="description" name="description" value={form.description} onChange={(e) => onTextareaChange(e)} rows={4} className={`${styles.formInput}`} placeholder="Task description..."/>
                </div>
                <div className="w-full my-6">
                    <label className={`${styles.formLabel}`}>Pick a Deadline</label>
                    <SelectDate deadline={dayjs(form.deadline)} funcHandler={pickDateHandler}/>
                </div>
           </div>
           <div className="w-full flex justify-end">
                <SquareButton btnType="submit" bgColor="bg-black-100" textColor="text-blue-500" text="Add New Task" loadingText="Adding..." loading={isLoading}/>
           </div>
        </form>
    </div>
  )
}

export default AddTask
