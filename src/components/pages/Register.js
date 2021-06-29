import React, { Component } from 'react';
import {Link,withRouter} from'react-router-dom';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            cnfpass:'',
        }
    }
    componentDidMount(){
       document.title = "Sign Up"
       if(this.props.data !=null){
           this.props.history.push('/')
       }
     }
    handleChange = (e) =>{
        let value = e.target.value
        let id = e.target.id
        this.setState({[id]:value})
        if(id=='email'){
            let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
            if(!emailExp.test(value)){
                $('#emailError').text(' * Invalid Format')}
            else{
                $('#emailError').text('');
            }
        }
        if(id=='password'){
            let passExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}")
            if(!passExp.test(value)){
                $('#passwordError').text(' * Invalid Format')
            }
            else{
                $('#passwordError').text('');
            }
        }
        if(id=='cnfpass'){
            if(this.state.password != value){
                $('#pass-missmatch').text('Password did not match.')
            }
            else{
                $('#pass-missmatch').text('');
            }
        }
        if(id=='username'){
            if(value.length <5 || value.length >20) {
                $('#UsernameError').text(" * Username should be more than 5 character and less than 20 Character.")}
            else{
                $('#UsernameError').text("");
            }
        }
    }
    handleSubmit = (e) =>{
        $('#message').removeClass().text('')
        e.preventDefault();
        let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
        let passExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}")
        $('#pass-missmatch').text('');
        $('#emailError').text('');
        $('#UsernameError').text("");
        $('#passwordError').text('');
        if(!emailExp.test(this.state.email)){
            $('#emailError').text(' * Invalid Format')
        }else if(!passExp.test(this.state.password)){
            $('#passwordError').text(' * Invalid Format')
        }
        else if(this.state.password != this.state.cnfpass){
            $('#pass-missmatch').text('Password did not match.')
        }
        else if(this.state.username.length<5 || this.state.username.length>20) $('#UsernameError').text(" * Username should be more than 5 character and less than 20 Character.")
        else{
            $('#message').addClass('text-green').text('Sending request please wait...');
            $("#submit").attr("disabled",true).text('Sending...');
            $('#pass-missmatch').text('')
            $('#emailError').text('')
            $('#UsernameError').text("")
            $('#passwordError').text('')
            var csrftoken = $.cookie('csrftoken');
            fetch("/api/v1/user/register",{
                method: "POST",
                body: JSON.stringify({
                    username:this.state.username,email:this.state.email,password:this.state.password,
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json",

                }
            }).then(function(response){
                $('#message').removeClass().text('')
                $("#submit").attr("disabled",false).text('Sign Up');
                if(response.status != 200){
                    $('#message').addClass('text-red').text(`Error ${response.status}: ${response.statusText}`);
                }
                else{
                response.json().then(data =>{
                        alert(data.info)
                        this.props.history.push("/login");
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
                    <h2>Sign Up</h2>
                    {/* <ol>
                        <li><a href="index.html">Home</a></li>
                        <li>Inner Page</li>
                    </ol> */}
                    </div>

                </div>
                </section>

                <section class="inner-page">
                    <div class="container">
                        <div className="form-container">
                            <p id="message"></p>
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-row row">
                                    <div class="form-group col-md-6">
                                        <label for="username">Username</label>
                                        <input type="text" class="form-control" onChange={this.handleChange} id="username" placeholder="Username" required />
                                        <small id="UsernameError" class="form-text text-muted text-red">
                                        </small>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" onChange={this.handleChange} id="email" placeholder="Email" required />
                                        <small id="emailError" class="form-text text-muted text-red">
                                        </small>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" onChange={this.handleChange} id="password" name="password" class="form-control" aria-describedby="passwordHelpBlock" required />
                                    <small id="passwordHelper" class="form-text text-muted">
                                    Your password must be more than 8 characters long, contain an Uppercase letters, a Lowercase letter and a number, and must not contain spaces, special characters, or emoji.
                                    </small>
                                    <small id="passwordError" class="form-text text-muted text-red"></small>
                                </div>
                                <div class="form-group">
                                    <label for="password-cnf">Confirm Password</label>
                                        <input type="password" onChange={this.handleChange} id="cnfpass" name="cnfpass" class="form-control" aria-describedby="passwordHelpBlock" required />
                                        <small id="pass-missmatch" class="form-text text-muted text-red">
                                            
                                        </small>
                                </div>
                                <br />
                                <button type="submit" id="submit" onClick={this.handleSubmit} class="btn btn-primary">Sign Up</button>
                            </form>
                        <hr />
                        <p>Already signed up? Login <Link to="/login">here</Link> </p>
                        </div>
                    </div>
                </section>

            </main>
        )
    }
}
export default withRouter(Register)