import { RxCross2 } from "react-icons/rx";
import {TaskHeader, RoundButton, TaskTooltip} from "../index";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskType } from "../../types/TaskType";
import { styles } from "../../constants";


type Props = {
    task: TaskType
}

const Task = ({ task }: Props) => {
    const navigate = useNavigate();
    const {id, title, description} = task;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
      };
    
    return ( 
        <div ref={setNodeRef} style={style} className={`p-4 bg-white-100 relative ${styles.border} ${styles.hover}`} onDoubleClick={() => navigate(`edit-task/${id}`)}> 
            <RoundButton id={id} btnType="button" bgColor="bg-black-100" textColor="text-blue-500" icon={<RxCross2/>} loadingText=""/>
            <TaskHeader taskData={task}/>
            <TaskTooltip title="Double Click to update Task, Holding to Drag">
                <div className="flex flex-col" {...attributes} {...listeners}>
                    <h3 className="text-lg font-medium text-black-100 mb-2">{title}</h3>
                    <p className="text-base font-regular text-black-200">{description}</p>
                </div>
            </TaskTooltip>
        </div> 
    )
}

export default Task
