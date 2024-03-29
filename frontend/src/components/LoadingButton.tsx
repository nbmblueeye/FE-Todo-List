import { Loading } from "./index"

type Props = {
    btnType:"reset" | "submit" | "button" | undefined,
    bgColor:string, 
    textColor:string,
    text?:string,
    icon?:any,
    buttonFunc?: () => void,
    loading: any,
    activeTask?:string,
    loadingText:string
  }

 
  const LoadingButton = ({ btnType, bgColor, textColor , text, buttonFunc, loading, loadingText}:Props) => {
    return (
      <button disabled={loading ? true:false} type={btnType} className={`${bgColor} ${textColor} min-w-[140px] px-4 py-2 shadow-lg text-base font-regular rounded hover:outline hover:outline-2 hover:outline-offset-2`}
      onClick={buttonFunc}
      >
        {
            loading ? 
            <Loading width="w-4" height="h-4" text={loadingText}/>
            :
            text
        }
      </button>
    )
  }

  const RoundLoadingButton = ({activeTask, btnType, bgColor, textColor , icon, buttonFunc, loading, loadingText}:Props) => {
    return (
      <button disabled={loading ? true:false} type={btnType} className={`${bgColor} ${textColor} rounded-full w-8 h-8 flex justify-center items-center absolute top-2 right-2 shadow-lg text-base font-regular hover:outline hover:outline-2 hover:outline-offset-2`}
      onClick={buttonFunc}
      >
        {
            loading == activeTask ? 
            <Loading width="w-4" height="h-4" text={loadingText}/>
            :
            icon
        }
      </button>
    )
  }
  
  export {LoadingButton , RoundLoadingButton}