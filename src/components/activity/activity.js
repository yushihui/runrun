
import React, { Component } from 'react';

class Activity extends Component {
    state = {
        activities: []
    }

    activityUrl='https://raw.githubusercontent.com/yushihui/go.strava/master/result/36533/activities.json'
    componentDidMount() {
        fetch(this.activityUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({ activities: data })
            })
            .catch(console.log)
    }
    render() {
        return (
            <div className="container">
                <div className="col-xs-12">
                    <h1>My Activities</h1>
                    {this.state.activities.map((activity) => (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{activity.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {activity.distance}
                                </h6>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default Activity