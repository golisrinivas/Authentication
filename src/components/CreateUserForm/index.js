
import { Component } from "react";

import "./index.css"
import { Link } from "react-router-dom";

class CreateUserForm extends Component{
    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        errorMsg: ''
    }

    onChangeFirstName = event => {
        this.setState({firstName: event.target.value});
    }

    onChangeLastName = event => {
        this.setState({lastName: event.target.value});
    }

    onChangeUsername = event => {
        this.setState({username: event.target.value});
    }

    onChangePassword = event => {
        this.setState({password: event.target.value});
    }

    onSubmitForm = async event => {
        event.preventDefault()
        const {firstName, lastName, username, password} = this.state
        const userDetails = {firstName, lastName, username, password};
        const url = "http://localhost:3000/createUser/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(userDetails),
        }

        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok === true){
            console.log(data.success);
        }
        else{
            console.log(data.failure);
            this.setState({errorMsg: data.failure});   
        }  

    }

    render(){
        const {firstName, lastName, username, password, errorMsg} = this.state
        return(
            <form onSubmit={this.onSubmitForm}>
                <div className="form-container">
                    <div className="register-form-container">
                        <div className="input-container">
                            <label className="label-field" htmlFor="firstName">FIRSTNAME</label>
                            <div className="input-container2">
                                <input className="input-field" type = "text" id = "firstName" onChange={this.onChangeFirstName} value = {firstName} placeholder="FirstName" />
                            </div>
                            
                        </div>
                        <div className="input-container" >
                            <label className="label-field" htmlFor="lastName">LASTNAME</label>
                            <div className="input-container2">
                                <input className="input-field" type = "text" id = "lastName" onChange={this.onChangeLastName} value = {lastName} placeholder="LastName" />
                            </div>
                            
                        </div>
                        <div className="input-container">
                            <label className="label-field" htmlFor="username">USERNAME</label>
                            <div className="input-container2">
                                <input className="input-field" type = "text" id = "username" onChange={this.onChangeUsername} value = {username} placeholder="UserName"/>
                            </div>
                            
                        </div>
                        <div className="input-container">
                            <label className="label-field" htmlFor="password">PASSWORD</label>
                            <div className="input-container2">
                            <input className="input-field" type = "password" id = "password" onChange={this.onChangePassword} value = {password} placeholder="Password"/>
                            </div>
                            
                        </div>
                        <button type = "submit" className="sign-up-button">Sign up</button>
                        <h1 className="error-msg">{errorMsg}</h1>
                    </div>
                    <div className="toggle-account-container">
                        <p>Have an account?</p>
                        <p><Link to = "/login">Log in</Link></p>
                    </div>
                </div>      
            </form>
        )
    }
}

export default CreateUserForm;