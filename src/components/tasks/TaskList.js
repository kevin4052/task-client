import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

export default class TaskList extends Component {
    constructor() {
        super();
        this.state ={
            listOfTask: null
        };
    }

    componentDidMount = () => {
        this.getAllTasks();
    }

    getAllTasks = () => {
        axios
            .get(`${process.env.REACT_APP_API_DOMAIN}/task/all-tasks`, {
                withCredentials: true
            })
            .then(tasksFromAPI => {
                this.setState({
                    listOfTask: tasksFromAPI.data
                })
            })
            .catch(err => console.log({ err }));
    }

    deleteTask = (taskId) => {
        axios
            .delete(`${process.env.REACT_APP_API_DOMAIN}/task/delete/${taskId}`, {
                withCredentials: true
            })
            .then(() => {
                this.getAllTasks();
            })
            .catch(err => console.log({ err }));
    }

    displayTasks = () => {
        return this.state.listOfTask.map((task, i) => {
            return (
                <div className="task-box center-content general-padding" key={i}>
                    <div className="space-between">
                        <h4><Link to={`/details/${task._id}`} >{task.title}</Link></h4>
                        <h5>{task.author}</h5>
                    </div>
                    <div>
                        <p>{task.description}</p>
                    </div>
                    <div className="space-between">
                        <h6>{task.isComplete ? "Task complete" : "Task not complete"}</h6>
                        <button><Link to={`/update/${task._id}`} >Edit</Link></button>
                        <button onClick={() => this.deleteTask(task._id)}>Delete</button>
                        <h6>Complete by: {task.completionDate}</h6>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="task-container general-padding">
                {this.state.listOfTask ? this.displayTasks() : <Loading />}
            </div>
        )
    }
}
