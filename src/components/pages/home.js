import React, { Component } from 'react';
import {Link,withRouter} from'react-router-dom';
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            load:false,
        }
    }
    componentDidMount(){
        document.title = "Home";
    }
        render() {
            return (
            <main id="main">
                <p>This is Home Page</p>
            </main>
        )}
}
export default withRouter(Home)