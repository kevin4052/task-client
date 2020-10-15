import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class UpdateTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            isComplete: false,
            completionDate: "",
            taskId: ""
        }
    }

    componentDidMount = () => {
        axios
            .get(`${process.env.REACT_APP_API_DOMAIN}/task/details/${this.props.match.params.taskId}`, {
                withCredentials: true
            })
            .then((taskFromAPI) => {
                console.log({taskDetails: taskFromAPI.data});
                this.setState({ ...taskFromAPI.data, taskId: taskFromAPI.data._id});
            })
            .catch(err => console.log({ err }));
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    submitUpdate = () => {
        console.log('submit')
        axios
            .put(`${process.env.REACT_APP_API_DOMAIN}/task/update`, this.state, {
                withCredentials: true
            })
            .then(() => {
                console.log("updated")
                // return <Redirect to='/task-list' />
                this.props.history.push('/task-list')
            })
            .catch(err => console.log({ err }));
    }


    render() {
        return (
            <div>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                <br/>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
                <br/>
                <input type="checkbox" name="isComplete" value={this.state.isComplete} onChange={this.handleChange}></input>
                <br/>
                <input type="date" name="completionDate" value={this.state.completionDate} onChange={this.handleChange}></input>
                <br/>
                <button onClick={this.submitUpdate}>Update</button>    
            </div>
        )
    }
}
