import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import React from "react";

const MINUTES_PER_MILE = 26.8224;
const hSplit = [165, 160, 155, 150, 145, 140, 135, 130];

function getBgColor(hbt) {
    return "hr" + hSplit.find(e => hbt >= e)
}

export default function ActivityItem(props) {
    const {activity} = props
    const ACTIVITY_WALK = "Walk";
    return (
        <Grid item xs={12} lg={2} sm={6}>
            <Paper className={classNames("paper", getBgColor(activity.average_heartrate), {
                walk: activity.type === ACTIVITY_WALK
            })}>
                <div className="card-name" title={activity.name}>{activity.name}</div>
                <div className="metrics">
                    <span className="distance pull-left">
                        P: {activity.average_speed > 0 ? ((MINUTES_PER_MILE / activity.average_speed).toFixed(2)) : activity.average_speed}
                        <small>m/mi</small>
                    </span>
                    <span className="distance pull-right">H: {activity.average_heartrate}</span>
                </div>
                <div className="metrics">
                    <span className="distance">D: {(activity.distance / 1609).toFixed(2)}<small>mi</small></span>
                    <span className="card-time pull-right">{activity.start_date_local.substr(2, 8)}</span>
                </div>
            </Paper>
        </Grid>
    )
}