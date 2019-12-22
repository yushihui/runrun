import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const activityTypes = ["All", "Run", "Walk", "Race", "Hike"];

export default function ActivityFilter(props) {
    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date, e) => {
        setStartDate(date);
    };

    const [endDate, setEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleEndDateChange = (date, e) => {
        console.log(e);
        setEndDate(date);
    };
    const [activityType, setActivityType] = React.useState("All");

    const handleActivityTypeChange = (data) => {
        setActivityType(data)
    };

    return (
        <div className={"query-inline"}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker className={"query-time"}
                                    margin="normal"
                                    id="start-time"
                                    label="Start date"
                                    format="MM/dd/yyyy"
                                    value={startDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                />
                <KeyboardDatePicker className={"query-time"}
                                    margin="normal"
                                    id="end-time"
                                    label="End date"
                                    format="MM/dd/yyyy"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                />
            </MuiPickersUtilsProvider>
            <TextField className={"query-range"}
                       id="outlined-number"
                       label="heartbeat rate"
                       defaultValue="150-180"
                       type="text"
                       InputLabelProps={{
                           shrink: true,
                       }}
                       variant="outlined"
            />
            <TextField className={"query-range"}
                       id="outlined-number"
                       label="Pace"
                       defaultValue="6-7"
                       type="text"
                       InputLabelProps={{
                           shrink: true,
                       }}
                       variant="outlined"
            />
            <TextField className={"query-range"}
                       id="outlined-number"
                       label="Distance(mile)"
                       type="text"
                       defaultValue="10-26"
                       InputLabelProps={{
                           shrink: true,
                       }}
                       variant="outlined"
            />

            <TextField className={"query-range"}
                id="outlined-select-currency-native"
                select
                label="Activity Type"
                value={activityType}
                onChange={handleActivityTypeChange}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
            >
                {activityTypes.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={(evt) => props.query({startDate, endDate})}
                    className={"search-btn"}>
                Search
            </Button>
        </div>
    )

}