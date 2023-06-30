import { Component } from "react";

class InputResults extends Component{
    state = {
        search: '',
        displayResults: []
    }
    
    onChangeInput = event => {
        this.setState({search: event.target.value});
    }

    onSearchInput = async event => {
        const {search} = this.state
        const url = `http://localhost:3000/users?search=${search}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyaW5pdmFzZ29saSIsImlhdCI6MTY4NzYyNDIzNn0.iIUKYDcouuAn1NGoWPxxMWSMtKlvr3mpy1p1S90WLUk"
              },   
        }
        
        const response = await fetch(url, options);
        const data = await response.json()
        this.setState({displayResults: data.userDetails});
    }

    render(){
        const {search, displayResults} = this.state
        return(
            <>
                <h1>Srinivas</h1>
                <input type = "search" onChange={this.onChangeInput} value = {search}/>
                <button onClick={this.onSearchInput}>Search</button>
                
                
                <ul>
                    {displayResults.map(eachResult => (
                        <li>
                            <h1>{eachResult.firstname}</h1>
                            <img src = {eachResult.lastname} alt = "text"/>
                        
                            <h1>{eachResult.username}</h1>
                            <h1>{eachResult.password}</h1>
                        </li>
                        
                    ))}
                </ul>
                
            </>
            
        )
    }
}

export default InputResults;