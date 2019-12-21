import React, {Component} from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';


export default function ActivityFilter(props) {
    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date, e) => {
        setStartDate(date);
    };

    const [endDate, setEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleEndDateChange = (date, e, i) => {
        console.log(e);
        setEndDate(date);
    };

    return (
        <div className={"query-inline"}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
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
                <KeyboardDatePicker
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

            <Button variant="contained" color="primary" onClick={(evt) => props.query({startDate, endDate})}
                    className={"search-btn"}>
                Search
            </Button>
        </div>
    )

}