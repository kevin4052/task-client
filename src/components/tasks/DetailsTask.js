import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

export default class DetailsTask extends Component {
    state = {
        title: "",
        description: "",
        isComplete: false,
        completionDate: "",
        taskId: null
    }

    componentDidMount = () => {
        axios
            .get(`${process.env.REACT_APP_API_DOMAIN}/task/details/${this.props.match.params.taskId}`, {
                withCredentials: true
            })
            .then((taskFromAPI) => {
                // console.log({taskDetails: taskFromAPI.data});
                this.setState({ ...taskFromAPI.data, taskId: taskFromAPI.data._id});
            })
            .catch(err => console.log({ err }));
    }

    displayTasks = () => {
            return (
                <div className="task-box center-content general-padding">
                    <div className="space-between">
                        <h4>{this.state.title}</h4>
                        <h5>{this.state.author}</h5>
                    </div>
                    <div>
                        <p>{this.state.description}</p>
                    </div>
                    <div className="space-between">
                        <h6>{this.state.isComplete ? "Task complete" : "Task not complete"}</h6>
                        <button><Link to={`/update/${this.state._id}`} >Edit</Link></button>
                        <button onClick={() => this.deleteTask(this.state._id)}>Delete</button>
                        <h6>Complete by: {this.state.completionDate}</h6>
                    </div>
                </div>
            )
    }

    render() {
        return (
            <div className="task-container general-padding">
                {this.state.taskId ? this.displayTasks() : <Loading />}
            </div>
        )
    }
}
