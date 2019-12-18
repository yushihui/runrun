import React, {Component} from 'react';




export default class ActivityFilter extends Component {
    constructor(props) {
        super(props);
    }

    output(evt) {
        this.setState({count: this.state.count + evt})
    }

    render() {
        return (
            <div>
                C component
                <button onClick={(evt) => this.props.query(Math.random())}>Filter</button>
            </div>
        )
    }
}