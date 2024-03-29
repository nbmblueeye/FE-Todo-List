import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

type Props = {
    deadline:Dayjs,
	funcHandler:(form:any) => void
}

const SelectDate = ({deadline, funcHandler}:Props) => {
    const [value, setValue] = useState(dayjs(deadline));
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Deadline"
                    value={value}
                    onChange={
                        (newValue:any) => {
                            funcHandler(newValue)
                            setValue(newValue)
                        }
                    }
                    slotProps={{ textField: { size: 'small'} }}
                />
            </LocalizationProvider>
        </>   
    )
}

export default SelectDate