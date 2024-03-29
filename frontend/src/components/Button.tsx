type Props = {
  btnType:"reset" | "submit" | "button" | undefined,
  bgColor:string, 
  textColor:string,
  text:string,
  buttonFunc?: () => void,
}
const Button = ({btnType, bgColor, textColor , text, buttonFunc}:Props) => {
  return (
    <button type={btnType} className={`${bgColor} ${textColor} px-4 py-2 shadow-lg text-base font-regular rounded 
    border border-tertiary hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-blue-500`}
    onClick={buttonFunc}
    >{text}</button>
  )
}

export default Button