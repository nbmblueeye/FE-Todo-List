import axios from "axios";

const API_URL = "https://fe-todo-list.onrender.com/api/todos/";

const getTasks = async (slug:string) => {
    let filter = {}
    if(slug == "all"){
        filter = {}
    }else if(slug == "completed"){
        filter = {status: true}
    }else if(slug == "pending"){
        filter = {status: false}
    }   
    const response = await axios.get(API_URL,{params:filter});
    return response;
}

const postTask = async ({id, ...task}:{id:string}) => {
    const response = await axios.post(API_URL, task);
    return response;
}

const getTask = async (id:string) => {
    const response = await axios.get(`${API_URL}${id}`);
    return response;
}

const putTask = async ({id,...task}:{id:string}) => {
    const response = await axios.put(`${API_URL}${id}`, task);
    return response;
}


const deleteTask = async (id:string) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response;
}

const taskAPI = { getTasks, postTask, getTask, putTask ,deleteTask };

export default taskAPI;