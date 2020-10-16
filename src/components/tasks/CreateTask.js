import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTask extends Component {
    state = {
        title: "",
        description: "",
        isComplete: false,
        completionDate: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    submitUpdate = () => {
        axios
            .post(`${process.env.REACT_APP_API_DOMAIN}/task/create`, this.state, {
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
                <label htmlFor="title" >Description: </label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor="title" >Complete by: </label>
                <input type="date" name="completionDate" value={this.state.completionDate} onChange={this.handleChange}></input>
                <br/>
                <button onClick={this.submitUpdate}>Creat Task</button>    
            </div>
        )
    }
}
