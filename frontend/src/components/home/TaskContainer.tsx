import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../../components";
import { TaskType } from "../../types/TaskType";
import { useAppDispatch } from "../../features/hook";
import { setTasks } from "../../features/sliders/taskSlider";

type Props = {
    tasksData:TaskType[]
}

const TaskContainer = ({tasksData}:Props) => {

    const dispatch = useAppDispatch(); 
    const handleDragEnd = (event:any) => {
        const { active, over } = event;
        if(active.id == over.id){
            return true;
        }
        dispatch(setTasks({activeId: active.id, overId: over.id}));
    }
   
  return (
   
    <div className="w-full">
        {
            tasksData.length > 0 ?  
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>      
                <div className="w-full flex flex-col gap-12">
                    <SortableContext items={tasksData} strategy={verticalListSortingStrategy}>
                        {
                            tasksData.map((task:any) => <Task task={task} key={task.id}/>)
                        }
                    </SortableContext>
                </div>
            </DndContext>
            :
            <h3>There're no Task available</h3>
        }
    </div>

  )
}

export default TaskContainer
