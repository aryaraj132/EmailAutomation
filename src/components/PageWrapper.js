import React, { Component } from 'react';
import {Link, withRouter} from'react-router-dom';
import { GoogleLogout } from 'react-google-login';
class PageWrapper extends Component {
    constructor(props){
        super(props);
    }
    mobileNavIcon = () =>{
        $("body").toggleClass("mobile-nav-active");
        $('#mobile-nav-icon').toggleClass("icofont-navigation-menu icofont-close")
        $('.mobile-nav-overly').toggle();
    }
    dropdownClick = (e) =>{
        e.preventDefault();
        let el = e.target;
        $(el).next().slideToggle(300);
      $(el).parent().toggleClass('active');
    }
    logout = (e) =>{
        e.preventDefault();
        localStorage.clear();
        this.props.changeState(null);
        this.props.history.push("/login");
    }
    logoutGoogle=()=>{
        localStorage.clear();
        this.props.changeState(null);
        this.props.history.push("/login");
    }
    render() {
        return (
            <div>
                <button type="button" className="mobile-nav-toggle d-lg-none" onClick={this.mobileNavIcon}><i id="mobile-nav-icon" className="icofont-navigation-menu"></i></button>
                <header id="header" className="fixed-top">
                    <div className="container d-flex align-items-center">

                    <h1 className="logo mr-auto"><Link to="/">Email Automation</Link></h1>

                    <nav className="nav-menu d-none d-lg-block">
                        <ul>
                        <li><Link to="/">Home</Link></li>
                        {this.props.data != null &&
                        <>
                        <li><Link to="/create">Create Mail</Link></li>
                        <li><Link to="/history">History</Link></li>
                        </>
                        }
                        <li class="drop-down"><a onClick={this.dropdownClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg> &nbsp; {this.props.data != null&&<>{this.props.data.username}</>}
                        </a>
                        <ul>
                        {this.props.data == null ?
                        <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        </>:
                        <>
                        <li><Link to="/sender">Sender Details</Link></li>
                        {this.props.data.method != undefined && this.props.data.method == "Google" ?
                        <GoogleLogout 
                            clientId="970651270283-q3dt7apnpphg2r6apav0h3vggmb3fr51.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.logoutGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        :<li><Link onClick={this.logout} to="/">Logout</Link></li>
                        }
                        </>
                        }
                        </ul>
                        </li>
                        </ul>
                    </nav>


                    </div>
                </header>
                <nav className="mobile-nav d-lg-none">
                    <ul>
                    <li><Link onClick={this.mobileNavIcon} to="/">Home</Link></li>
                    {this.props.data != null &&
                    <>
                    <li><Link onClick={this.mobileNavIcon} to="/create">Create Mail</Link></li>
                    <li><Link onClick={this.mobileNavIcon} to="/history">History</Link></li>
                    </>
                    }
                        
                        <li class="drop-down"><a onClick={this.dropdownClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>&nbsp; {this.props.data != null&&<>{this.props.data.username}</>}
                        </a>
                        <ul>
                        {this.props.data == null ?
                        <>
                        <li><Link onClick={this.mobileNavIcon} to="/register">Register</Link></li>
                        <li><Link onClick={this.mobileNavIcon} to="/login">Login</Link></li>
                        </>:
                        <>
                        <li><Link onClick={this.mobileNavIcon} to="/sender">Sender Details</Link></li>
                        {this.props.data.method != undefined && this.props.data.method == "Google" ?
                        <GoogleLogout 
                            clientId="970651270283-q3dt7apnpphg2r6apav0h3vggmb3fr51.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.logoutGoogle}
                            cookiePolicy={'single_host_origin'}
                        />:
                        <li><Link onClick={this.logout} onClick={this.mobileNavIcon} to="/">Logout</Link></li>
                        }
                        </>
                        }
                        </ul>
                        </li>
                    </ul>
                </nav>
                {this.props.children}
            </div>

        )
    }
}

export default withRouter(PageWrapper)