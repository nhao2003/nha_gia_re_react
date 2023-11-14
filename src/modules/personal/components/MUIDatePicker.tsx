import { Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import {DatePicker} from '@mui/lab'

const MUIDatePicker = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  return (
    <Stack>

      <DatePicker renderInput={(params : any) => <TextField {...params}/>}
        value ={selectedDate}
      />

    </Stack>
  )
}

export default MUIDatePicker
