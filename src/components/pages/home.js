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
                <section class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                    <h2>Home</h2>
                    </div>

                </div>
                </section>
                {this.props.data!=null ?
                <section class="inner-page">
                <div class="container">
                    <p>Logged IN</p>
                    <p>Welcome {this.props.data.username}</p>
                </div>
                </section>
                :
                <section class="inner-page">
                <div class="container">
                    <p>Logged Out</p>
                </div>
                </section>}
            </main>
        )}
}
export default withRouter(Home)