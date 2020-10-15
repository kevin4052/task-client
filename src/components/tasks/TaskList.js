import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Loading';

export default class TaskList extends Component {
    constructor() {
        super();
        this.state ={
            listOfTask: null
        };
    }

    componentDidMount = () => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/task/all-tasks`)
            .then(tasksFromAPI => {
                this.setState({
                    listOfTask: tasksFromAPI.data
                })
            })
            .catch(err => console.log(err));
    }

    displayTasks = () => {
        return this.state.listOfTask.map((task, i) => {
            return (
                <div className="task-box center-content" key={i}>
                    <div className="space-between">
                        <h4>{task.title}</h4>
                        <h5>{task.author}</h5>
                    </div>
                    <div>
                        <p>{task.description}</p>
                    </div>
                    <div className="space-between">
                        <h6>{task.isCompleted ? "Task complete" : "Task not complete"}</h6>
                        <h6>Complete by: {task.completionDate}</h6>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="task-container">
                {this.state.listOfTask ? this.displayTasks() : <Loading />}
            </div>
        )
    }
}
