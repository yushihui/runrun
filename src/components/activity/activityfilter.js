import React, {useState} from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const activityTypes = ["All", "Run", "Walk", "Race", "Hike"];

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        if(e.target === undefined) {
            setValue(e);
        } else {
            setValue(e.target.value);
        }

    }

    return {
        value,
        onChange: handleChange
    }
}

export default function ActivityFilter(props) {
    const startDate = useInput(new Date('2019-08-18T21:11:54'));
    const endDate = useInput(new Date('2019-10-18T21:11:54'));
    const activityType = useInput("All");
    const pace = useInput("8-10");
    const distance = useInput("8-10");
    const avgHeartbeat = useInput("130-150");
    return (
        <div className={"query-inline"}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker className={"query-time"}
                                    margin="normal"
                                    id="start-time"
                                    label="Start date"
                                    format="MM/dd/yyyy"
                                    {...startDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                />
                <KeyboardDatePicker className={"query-time"}
                                    margin="normal"
                                    id="end-time"
                                    label="End date"
                                    format="MM/dd/yyyy"
                                    {...endDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                />
            </MuiPickersUtilsProvider>
            <TextField className={"query-range"}
                       id="outlined-number"
                       label="heartbeat rate"
                       type="text"
                       InputLabelProps={{
                           shrink: true,
                       }}
                       variant="outlined"
                       {...avgHeartbeat}
            />
            <TextField className={"query-range"}
                       id="outlined-number"
                       label="Pace"
                       type="text"
                       InputLabelProps={{
                           shrink: true,
                       }}
                       variant="outlined"
                       {...pace}
            />
            <TextField className={"query-range"}
                       id="outlined-number"
                       label="Distance(mile)"
                       type="text"
                       InputLabelProps={{
                           shrink: true,
                       }}
                       variant="outlined"
                       {...distance}
            />
            <Select className={"query-range"}
                    id="outlined-select-currency-native"
                    {...activityType}
            >
                {activityTypes.map(option => (
                    <MenuItem value={option} key={option}>{option}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary"
                    onClick={(evt) => props.query({
                        startDate: startDate.value,
                        endDate: endDate.value,
                        activityType: activityType.value,
                        pace: pace.value,
                        avgHeartbeat:avgHeartbeat.value,
                        distance:distance.value
                    })}
                    className={"search-btn"}>
                Search
            </Button>
        </div>
    )

}