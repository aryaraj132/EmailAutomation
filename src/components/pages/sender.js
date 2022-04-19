import React, { Component } from 'react';
import {withRouter} from'react-router-dom';
class Sender extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }
    componentDidMount(){
       document.title = "Sender Details"
       if(this.props.data ==null){
        this.props.history.push('/login')
    }
     }
    handleChange = (e) =>{
        let value = e.target.value
        let id = e.target.id
        this.setState({[id]:value})
        if(id == 'email'){
            let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
            if(!emailExp.test(value)){
                $('#UsernameError').text(" * Invalid Format")
            }
            else{
                $('#UsernameError').text("");
            }
        }
    }
    handleSubmit = (e) =>{
        $('#message').removeClass().text('')
        e.preventDefault();
        let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
        $('#UsernameError').text("");
        $('#passwordError').text('');
        if(!emailExp.test(this.state.email)) $('#UsernameError').text(" * Invalid Format")
        else{
            $('#message').addClass('text-green').text('Sending request please wait...');
            $("#submit").attr("disabled",true).text('Sending...');
            $('#UsernameError').text("")
            $('#passwordError').text('')
            var csrftoken = $.cookie('csrftoken');
            fetch("/api/v1/user/sender-info",{
                method: "POST",
                body: JSON.stringify({
                    userID: this.props.data._id,
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json",

                }
            }).then(function(response){
                $('#message').removeClass().text('')
                $("#submit").attr("disabled",false).text('Submit');
                if(response.status != 200){
                    $('#message').addClass('text-red').text(`Error ${response.status}: ${response.statusText}`);
                }
                else{
                response.json().then(data =>{
                    $('#message').addClass('text-green').text(`${data.info}`);
                    setTimeout(()=>{
                    this.props.history.push('/create')
                    },2000)
                })}
            }.bind(this)).catch(error=>{
                $('#message').addClass('text-red').text(error)
            })
            
        }
    }
    render() {
        return (
            <main id="main">
                <section class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                    <h2>Sender Details</h2>
                    {/* <ol>
                        <li><a href="index.html">Home</a></li>
                        <li>Inner Page</li>
                    </ol> */}
                    </div>

                </div>
                </section>

                <section class="inner-page">
                    <div class="container">
                    <div className="m-4 p-4">
                        <p>To generate your app password follow <a href='https://support.google.com/accounts/answer/185833?hl=en' target='_blank'>these instructions.</a><br />
                        Please Use Gmail only for this process and allow your app password for mail access.</p>
                    </div>
                        <div className="form-container">
                            <span id="message"></span>
                            <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="username">Email</label>
                                        <input type="text" class="form-control" onChange={this.handleChange} id="email" placeholder="Sender's Email" required />
                                        <small id="UsernameError" class="form-text text-muted text-red">
                                        </small>
                                    </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" onChange={this.handleChange} id="password" name="password" class="form-control" aria-describedby="passwordHelpBlock" required />
                                    <small id="passwordError" class="form-text text-muted text-red"></small>
                                </div>
                                <br />
                                <button type="submit" id="submit" onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
                            </form>
                            <hr />
                        </div>
                    </div>
                </section>

            </main>
        )
    }
}
export default withRouter(Sender)