import { useLocation, useNavigate } from "react-router-dom"
import { SquareButton } from "./index";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const{ pathname } = useLocation();
  const [headerButtonText, setHeaderButtonText] = useState("Add New Task");
  const [headerTitleText, setHeaderTitleText] = useState("Add New Task");

  const navigationFunc = () =>{
    if(pathname === "/add-new-task"){
      navigate("/")
    }else if(pathname.indexOf("edit-task") != -1){
      navigate("/")
    }else if(pathname === "/"){
      navigate("/add-new-task")
    }
  }

  useEffect(() => {
    if(pathname === "/add-new-task"){
      setHeaderButtonText("Back");
      setHeaderTitleText("Add New Task");
    }else if(pathname.indexOf("edit-task") != -1){
      setHeaderButtonText("Back");
      setHeaderTitleText("Update Selected Task")
    }else if(pathname === "/"){
      setHeaderButtonText("Add New Task");
      setHeaderTitleText("TO DO List")
    }
  }, [pathname])
  
  return (
    <header className="w-full bg-primary">
      <div className="container max-w-[600px] p-4 mx-auto flex justify-between items-center">
        <h1 className="text-white-100 text-3xl font-black">{headerTitleText}</h1>
        <SquareButton btnType="button" bgColor="bg-white-100" textColor="text-blue-600" text={`${headerButtonText}`} loadingText="" buttonFunc={navigationFunc}/>
      </div>
    </header>
  )
}

export default Header