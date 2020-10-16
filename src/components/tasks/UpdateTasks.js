import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

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
                // console.log({taskDetails: taskFromAPI.data});
                this.setState({ ...taskFromAPI.data, taskId: taskFromAPI.data._id});
            })
            .catch(err => console.log({ err }));
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleCheckBox = () => {
        this.setState((preState) => ({
            isComplete: !preState.isComplete
        }))
    }

    submitUpdate = () => {
        axios
            .put(`${process.env.REACT_APP_API_DOMAIN}/task/update`, this.state, {
                withCredentials: true
            })
            .then(() => {
                // return (<Redirect to='/task-list' />);
                this.props.history.push('/task-list')
            })
            .catch(err => console.log({ err }));
    }

    render() {
        return (
            <div>
                <label htmlFor="title" >Title: </label>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor="description" >Description: </label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor="isComplete" >is completed: </label>
                <input type="checkbox" name="isComplete" checked={this.state.isComplete} onChange={this.handleCheckBox}></input>
                <br/>
                <label htmlFor="completionDate" >Complete by: </label>
                <input type="date" name="completionDate" value={this.state.completionDate} onChange={this.handleChange}></input>
                <br/>
                <button onClick={this.submitUpdate}>Update</button>    
            </div>
        )
    }
}
