import React, { Component} from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from "./pages/Home"
import History from "./pages/History"
import Create from "./pages/Create";
import PageWrapper from "./PageWrapper";
import Register from "./pages/Register"
import Login from "./pages/login"
import Sender from "./pages/sender"
export default class App extends Component{
    constructor(props){
        super(props);
        this.state={data:JSON.parse(localStorage.getItem('UserInfo'))}
    }
    updateState =(newData)=>{
        this.setState({data:newData})
    }
    render(){
        return (
            <Router>
                <PageWrapper data={this.state.data} changeState={this.updateState}>
                    <Route
                    exact={true}
                    path="/"
                    render={(props) => <Home {...props} data={this.state.data} changeState={this.updateState} />}
                    />
                    <Route
                    path="/create"
                    render={(props) => <Create {...props} data={this.state.data} changeState={this.updateState} />}
                    />
                    <Route
                    path="/history"
                    render={(props) => <History {...props} data={this.state.data} changeState={this.updateState} />}
                    />
                    <Route
                    path="/register"
                    render={(props) => <Register {...props} data={this.state.data} changeState={this.updateState} />}
                    />
                    <Route
                    path="/login"
                    render={(props) => <Login {...props} data={this.state.data} changeState={this.updateState} />}
                    />
                    <Route
                    path="/sender"
                    render={(props) => <Sender {...props} data={this.state.data} changeState={this.updateState} />}
                    />
                </PageWrapper>
            </Router>
    );
    }
}

const appDiv = document.getElementById("app");
render(<App />,appDiv);