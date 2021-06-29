import React, { Component } from 'react';
import {Link, withRouter} from'react-router-dom';
import GoogleLogin from 'react-google-login';
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
            let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
            if(!emailExp.test(value)){
                $('#UsernameError').text(" * Invalid Format")
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
        let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
        $('#UsernameError').text("");
        $('#passwordError').text('');
        if(!passExp.test(this.state.password)){
            $('#passwordError').text(' * Your password must be more than 8 characters long, contain an Uppercase letters, a Lowercase letter and a number, and must not contain spaces, special characters, or emoji.')
        }
        else if(!emailExp.test(this.state.username)) $('#UsernameError').text(" * Invalid Format")
        else{
            $('#message').addClass('text-green').text('Sending request please wait...');
            $("#submit").attr("disabled",true).text('Sending...');
            $('#UsernameError').text("")
            $('#passwordError').text('')
            var csrftoken = $.cookie('csrftoken');
            fetch("/api/v1/user/login",{
                method: "POST",
                body: JSON.stringify({
                    email: this.state.username,
                    password: this.state.password
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
                        localStorage.setItem('UserInfo', JSON.stringify(data));
                        this.props.changeState(data)
                        this.props.history.push("/");
                })}
            }.bind(this)).catch(error=>{
                $('#message').addClass('text-red').text(error)
            })
            
        }
    }
    responseGoogle = (response) =>{
        let profile = response.profileObj
        let obj = new Object;
        obj = {
          "_id": profile.googleId,
          "username": profile.name,
          "email": profile.email,
          "method":"Google"
        }
        localStorage.setItem('UserInfo', JSON.stringify(obj));
        this.props.changeState(obj)
        this.props.history.push("/");
    }
    responseGoogleFail = (res) =>{
        alert("Failed to login!!");
        console.log(res);
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
                    <div className="m-4 p-4">
                        <GoogleLogin 
                            clientId="970651270283-q3dt7apnpphg2r6apav0h3vggmb3fr51.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogleFail}
                            cookiePolicy={'single_host_origin'}
                        />    
                    </div>
                        <div className="form-container">
                            <span id="message"></span>
                            <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="username">Email</label>
                                        <input type="text" class="form-control" onChange={this.handleChange} id="username" placeholder="Email" required />
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
                        <p>New Here? <Link to="/register">Sign Up</Link> </p>
                        </div>
                    </div>
                </section>

            </main>
        )
    }
}
export default withRouter(Login)