import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { getTasks } from "../../features/services/taskService";
import { reset } from "../../features/sliders/taskSlider";
import { Task , Loading, Button } from "../../components";


const TaskMenus = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Completed",
    slug: "completed",
  },
  {
    name: "Pending",
    slug: "pending",
  }
];

const Home = () => {

  const dispatch = useAppDispatch();
  const {isLoading, isSuccess, isError , message, tasks } = useAppSelector(state => state.task);
  const [activeData, setActiveData] = useState("all");

  useEffect(() => {
    dispatch(getTasks(activeData));
    return () => {
      dispatch(reset());
    }
  }, [activeData]);

  
  if(isLoading){
    return(
      <div className="container mx-auto max-w-6xl h-screen flex justify-center items-center">
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
            
        <div className="flex flex-row gap-8 mb-8 border-b-2 border-tertiary pb-4">  
          {
            TaskMenus.map((TaskMenu, index) => <Button key={index} btnType="button" bgColor={`${activeData == TaskMenu.slug ? "bg-black-100":"bg-white-100"}`} textColor={`${activeData == TaskMenu.slug ? "text-white-100":"text-black-100"}`} text={TaskMenu.name} buttonFunc={() => setActiveData(TaskMenu.slug)}/>)
          }      
        </div>
        <div className="w-full flex flex-col">
           {
            tasks.length > 0 ?
            tasks.map((task, index) => 
              <Task taskData={task} key={index}/>
            )
            :
            <h3>There're no Task available</h3>
           }
        </div>
      </div>
    </div>
  )
}

export default Home
