import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import './activity.css'
import ActivityFilter from "./activityfilter";
import ActivityItem from "./activityItem";


const MINUTES_PER_MILE = 26.8224;

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
                        <ActivityItem activity={activity} key={activity.id}></ActivityItem>
                    ))}
                </Grid>
            </div>
        );
    }
}
