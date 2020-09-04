import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classNames from "classnames";
import './activity.css'
import ActivityFilter from "./activityfilter";


const MINUTES_PER_MILE = 26.8224;
const hSplit = [165, 160, 155, 150, 145, 140, 135, 130];

function getBgColor(hbt) {
    return "hr" + hSplit.find(e => hbt >= e)
}

function checkRange(str) {
    const regex = /[0-9]-[0-9]/g;
    return str.match(regex)
}

function parsePaceRange(str) {
    let [lo, hi] = str.split("-")
    let loo = MINUTES_PER_MILE / parseFloat(hi).toFixed(2)
    hi = MINUTES_PER_MILE / parseFloat(lo).toFixed(2)
    return [loo, hi]
}

function parseRange(str) {
    let [lo, hi] = str.split("-")
    lo = parseInt(lo)
    hi = parseInt(hi)
    return [lo, hi]
}

export default class Activity extends Component {

    state = {
        activities: []
    };
    activities = [];
    ACTIVITY_WALK = "Walk";
    //activityUrl = 'https://raw.githubusercontent.com/yushihui/go.strava/master/result/36533/activities.json';
    activityUrl = '/activity.json';

    componentDidMount() {
        fetch(this.activityUrl)
            .then(res => res.json())
            .then((data) => {
                this.activities = data;
                this.setState({activities: data})
            })
            .catch(console.log)
    }


    queryActivities = (activityQuery) => {
        let activities = this.activities.filter(activity => (activityQuery.activityType === 'All' || activity.type === activityQuery.activityType))
        if (checkRange(activityQuery.pace)) {
            const [lo, hi] = parsePaceRange(activityQuery.pace)
            activities = activities.filter(activity => activity.average_speed >= lo && activity.average_speed <= hi)
        }

        if (checkRange(activityQuery.avgHeartbeat)) {
            const [lo, hi] = parseRange(activityQuery.avgHeartbeat)
            activities = activities.filter(activity => activity.average_heartrate >= lo && activity.average_heartrate <= hi)
        }

        if (checkRange(activityQuery.distance)) {
            let [lo, hi] = parseRange(activityQuery.distance)
            lo = lo * 1609;
            hi = hi * 1609;
            activities = activities.filter(activity => activity.distance >= lo && activity.distance <= hi)
        }

        activities = activities.filter(activity =>
            new Date(activity.start_date) >= activityQuery.startDate
            && new Date(activity.start_date) <= activityQuery.endDate)

        this.setState({activities: activities})
    };

    render() {
        return (
            <div className="">
                <div className={"filter-row"}>
                    <ActivityFilter query={this.queryActivities}/>
                </div>
                <Grid container spacing={3}>
                    {this.state.activities.map((activity) => (
                        <Grid item xs={12} lg={2} sm={6} key={activity.id}>
                            <Paper className={classNames("paper", getBgColor(activity.average_heartrate), {
                                walk: activity.type === this.ACTIVITY_WALK
                            })}>
                                <div className="card-name" title={activity.name}>{activity.name}</div>

                                <div className="metrics">
                                    <span
                                        className="distance pull-left">P: {activity.average_speed > 0 ? ((MINUTES_PER_MILE / activity.average_speed).toFixed(2)) : activity.average_speed}<small>m/mi</small></span>
                                    <span
                                        className="distance pull-right">H: {activity.average_heartrate}</span>
                                </div>
                                <div className="metrics">
                                     <span
                                         className="distance">D: {(activity.distance / 1609).toFixed(2)}<small>mi</small></span>
                                    <span
                                        className="card-time pull-right">{activity.start_date_local.substr(2, 8)}</span>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}
