import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 160,
  },
});
const TaskTooltip = ({title, children}:{title:string, children:any}) => {

  return (
    <CustomWidthTooltip title={title} placement='bottom'>
      {children}
    </CustomWidthTooltip>
  )
}

export default TaskTooltip
