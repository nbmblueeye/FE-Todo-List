import { styles } from "../constants"
import { Loading } from "./index"

type Props = {  
    btnType:"reset" | "submit" | "button" | undefined,
    bgColor:string, 
    textColor:string,
    text?:string,
    loading?: any,
    loadingText:string
    buttonFunc?: () => void,
  }

  const SquareButton = ({ btnType, bgColor, textColor , text,  loading, loadingText, buttonFunc}:Props) => {

    return (
      <button disabled={loading ? true:false} type={btnType} className={`${bgColor} ${textColor} 
      min-w-[80px] px-4 py-2 text-base font-regular rounded ${styles.border} ${styles.hover}`}
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

  
  
  export default SquareButton