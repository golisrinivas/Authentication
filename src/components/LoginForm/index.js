import { Component } from "react";

import Cookies from "js-cookie";

import { Link, Navigate} from "react-router-dom";

import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";

import "./index.css"

class LoginForm extends Component{
    state = {
        username: '',
        password: '',
        showPassword: false,
        eyeImage: false,
        errorMessage: ' '
    }

    onChangeUsername = event => {
        this.setState({username: event.target.value});
    }

    onChangePassword = event => {
        this.setState({password: event.target.value});
    }

    onShowPasswordAndEyeImage = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
        this.setState(prevState => ({
            eyeImage: !prevState.eyeImage
        }))
    }

    onSubmitSuccess = jwtToken => {
        Cookies.set("jwt_token", jwtToken, {expires: 30});
        <Navigate to="/" replace={true}/>
    }

    

    onSubmitForm = async event => {
        event.preventDefault()
        const {username, password} = this.state
        const userDetails = {username, password};
        const url = "http://localhost:3000/login/";
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
            console.log(data.jwt_token);
            this.onSubmitSuccess(data.jwt_token);
            this.setState({errorMessage: null});
        }

        else{
            if (response.status === 400){
                console.log(data.failure);
                this.setState({errorMessage: data.failure})
            }
            else if (response.status === 401){
                console.log(data.passwordFailure);
                this.setState({errorMessage: data.passwordFailure})
            }
            
        }
        
    }

    render(){
        const {username, password, showPassword, eyeImage, errorMessage} = this.state
        return(
            
            <form onSubmit={this.onSubmitForm}>
                <div className="form-container">
                    <div className="login-form-container">
                        <div className="input-container">
                            <label htmlFor="username" className="input-label">USERNAME</label>
                            <div className="input-container2">
                                <input type = "text" id = "username" onChange={this.onChangeUsername} value = {username} placeholder="Username" className="input-field"/>
                            </div>
                            
                        </div>
                        <div className="input-container">
                            <label htmlFor="password" className="input-label">PASSWORD</label>
                            <div className="password-eye-container">
                                <input type = {showPassword ? "text" : "password"} id = "password" onChange={this.onChangePassword} value = {password} placeholder="Password" className="input-field"/>
                                <button className="button" type = "button" onClick={this.onShowPasswordAndEyeImage}>{eyeImage ? <AiFillEyeInvisible/> : <AiFillEye/>}</button>
                            </div>
                        </div>
                        
                        <button type = "submit" className="login-button">Log in</button>
                        <p className="error-message">{errorMessage}</p>
                    </div>
                    <div className="toggle-account-container">
                        <p>Don't have an account?</p>
                        <p><Link to = "/signup">Sign up</Link></p>
                    </div>
                </div>
            </form>
            
        
        )
    }
}

export default LoginForm;