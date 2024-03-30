import { useEffect, useState } from "react";
import { Loading } from "./index"
import { useAppDispatch, useAppSelector } from "../features/hook";
import { deleteTask } from "../features/services/taskService";
import { reset } from "../features/sliders/taskSlider";
import { styles } from "../constants";

type Props = {
    id:string,
    btnType:"reset" | "submit" | "button" | undefined,
    bgColor:string, 
    textColor:string,
    icon?:any,
    loadingText:string
  }


const RoundButton = ({id , btnType, bgColor, textColor , icon , loadingText}:Props) => {

    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector(state => state.task);

    const [ deletedTask , setDeletedTask ] = useState<string | null>(null);
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
  
    <button disabled={id == deletedTask ? true:false} type={btnType} className={`${bgColor} ${textColor} rounded-full w-8 h-8 flex justify-center items-center absolute top-2 right-2 shadow-lg text-base font-regular ${styles.hover}`}
      onClick={() => deleteTaskHandler(id)}
    >
        {
            id == deletedTask ? 
            <Loading width="w-4" height="h-4" text={loadingText}/>
            :
            icon
        }
    </button>
    
  )
}

export default RoundButton

