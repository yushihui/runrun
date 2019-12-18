import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classNames from "classnames";
import './activity.css'


const activityStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));
const MINUTES_PER_MILE = 26.8224;
const hSplit = [165, 160, 155, 150, 145, 140, 135, 130];

function getBgColor(hbt) {
    return "hr" + hSplit.find(e => hbt >= e)
}

export default class Activity extends Component {

    state = {
        activities: []
    };
    ACTIVITY_WALK = "Walk";
    ACTIVITY_RUN = "Run";

    activityUrl = 'https://raw.githubusercontent.com/yushihui/go.strava/master/result/36533/activities.json';

    componentDidMount() {
        fetch(this.activityUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({activities: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="">
                <h3>My Activities</h3>
                <Grid container spacing={3}>
                    {this.state.activities.map((activity) => (
                        <Grid item xs={12} lg={2} sm={6}>
                            <Paper className={classNames("paper", getBgColor(activity.average_heartrate),{
                                walk: activity.type === this.ACTIVITY_WALK
                            })}>
                                <span className="card-name">{activity.name}</span>
                                <span className="card-time">{activity.start_date_local.substr(0, 10)}</span>
                                <section>
                                    <span
                                        className="distance">D: {(activity.distance / 1609).toFixed(2)}<small>mi</small></span>
                                    <span
                                        className="distance">P: {activity.average_speed > 0 ? ((MINUTES_PER_MILE / activity.average_speed).toFixed(2)) : activity.average_speed}<small>m/mi</small></span>
                                    <span
                                        className="distance">H: {activity.average_heartrate}</span>

                                </section>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}
