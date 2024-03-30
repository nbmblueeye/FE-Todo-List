import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { getTasks } from "../../features/services/taskService";
import { reset } from "../../features/sliders/taskSlider";
import { TaskContainer , Loading, SquareButton } from "../../components";
import { TaskMenus, styles } from '../../constants';

const Home = () => {

  const dispatch = useAppDispatch();
  const {isLoading, isSuccess, isError , message, tasks } = useAppSelector(state => state.task);
  const [activeData, setActiveData] = useState("all");

  useEffect(() => {
    dispatch(getTasks(activeData));
    return () => {
      dispatch(reset())
    }
  }, [activeData]);

  if(isLoading){
    return(
      <div className={`${styles.container}`}>
        <Loading width="w-12" height="h-12" text=""/>
      </div>
     
    )
  }
  
  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="max-w-[600px] mx-auto p-4">     
        <div className={`p-4 mb-4 h-[40px] flex items-center ${isSuccess &&  message && "bg-green-100"} ${isError && message && 'bg-red-100'}`}>
          {
            message && <p className={`font-normal text-[14px] ${isSuccess && "text-green-500"} ${isError && 'text-red-500'}`}>{message}</p>
          }
        </div>
            
        <div className="flex flex-row gap-8 mb-12 border-b-2 border-tertiary pb-4">  
          {
            TaskMenus.map((TaskMenu, index) => 
            <SquareButton key={index} btnType="button" bgColor={`${activeData == TaskMenu.slug ? "bg-black-100":"bg-white-100"}`} textColor={`${activeData == TaskMenu.slug ? "text-white-100":"text-black-100"}`} text={TaskMenu.name} loadingText="" buttonFunc={() => setActiveData(TaskMenu.slug)}/>
            )
          }      
        </div>
        <TaskContainer tasksData={tasks}/>
      </div>
    </div>
  )
}

export default Home
