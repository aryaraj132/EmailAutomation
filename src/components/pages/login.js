import React, { Component } from 'react';
import {Link, withRouter} from'react-router-dom';
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
    }
    componentDidMount(){
       document.title = "Login"
       if(this.props.data !=null){
        this.props.history.push('/')
    }
     }
    handleChange = (e) =>{
        let value = e.target.value
        let id = e.target.id
        this.setState({[id]:value})
        if(id == 'username'){
            if(value.length <5 || value.length >20){
                $('#UsernameError').text(" * Username should be more than 5 character and less than 20 Character.")
            }
            else{
                $('#UsernameError').text("");
            }
        }
        if(id == 'password'){
            let passExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}")
            if(!passExp.test(value)){
                $('#passwordError').text(' * Your password must be more than 8 characters long, contain an Uppercase letters, a Lowercase letter and a number, and must not contain spaces, special characters, or emoji.')
            }
            else{
                $('#passwordError').text('');
            }
        }
    }
    handleSubmit = (e) =>{
        $('#message').removeClass().text('')
        e.preventDefault();
        let passExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}")
        $('#UsernameError').text("");
        $('#passwordError').text('');
        if(!passExp.test(this.state.password)){
            $('#passwordError').text(' * Your password must be more than 8 characters long, contain an Uppercase letters, a Lowercase letter and a number, and must not contain spaces, special characters, or emoji.')
        }
        else if(this.state.username.length<5 || this.state.username.length>20) $('#UsernameError').text(" * Username should be more than 5 character and less than 20 Character.")
        else{
            $('#message').addClass('text-green').text('Sending request please wait...');
            $("#submit").attr("disabled",true).text('Sending...');
            $('#UsernameError').text("")
            $('#passwordError').text('')
            var csrftoken = $.cookie('csrftoken');
            fetch("/user/login",{
                method: "POST",
                body: JSON.stringify({
                    username: this.state.username,
                    pass: this.state.password
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json",

                }
            }).then(function(response){
                $('#message').removeClass().text('')
                $("#submit").attr("disabled",false).text('Login');
                if(response.status != 200){
                    $('#message').addClass('text-red').text(`Error ${response.status}: ${response.statusText}`);
                }
                else{
                response.json().then(data =>{
                    if(data.error==undefined){
                        $('#message').addClass('text-green').text(data.success);
                        localStorage.setItem('UserInfo', JSON.stringify(data.info));
                        this.props.changeState(data.info)
                        this.props.history.push("/");
                    }
                    else{
                        $('#message').addClass('text-red').text(data.error);
                    }
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
                    <h2>Login</h2>
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
                            <span id="message"></span>
                            <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="username">Username or Email</label>
                                        <input type="text" class="form-control" onChange={this.handleChange} id="username" placeholder="Username or Email" required />
                                        <small id="UsernameError" class="form-text text-muted text-red">
                                        </small>
                                    </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" onChange={this.handleChange} id="password" name="password" class="form-control" aria-describedby="passwordHelpBlock" required />
                                    <small id="passwordError" class="form-text text-muted text-red"></small>
                                </div>
                                <br />
                                <button type="submit" id="submit" onClick={this.handleSubmit} class="btn btn-primary">Login</button>
                            </form>
                            <hr />
                            <div class="d-flex justify-content-around flex-wrap">
                            <p><Link to="/forgot-password">Forgot Password ?</Link></p>
                        <p>New Here? <Link to="/register">Sign Up</Link> </p>
                        </div>
                        </div>
                    </div>
                </section>

            </main>
        )
    }
}
export default withRouter(Login)