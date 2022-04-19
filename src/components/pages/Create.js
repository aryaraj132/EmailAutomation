import React, { Component } from 'react';
import {Link,withRouter} from'react-router-dom';
class Create extends Component {
    constructor(props){
        super(props);
        this.state={
            load:false,
            sendTo:'',
            CC:[],
            subject:'',
            body:'',
            scheduleType:'Recurring',
            schedule:{'val':[0,20,40],'type':"minute"},
            html:false
        }
        this.error = false
    }
    componentDidMount(){
        document.title = "Create Mail";
        if(this.props.data ==null){
            this.props.history.push("/login");
        }
    }
    scheduleChange=(e)=>{
        let value = e.target.value
        let id = e.target.id
        if(this.state.scheduleType=='Recurring'){
            let dur = $("#RecurringValue").val()
            let Int = $("#RecurringTime").val()
            let arr = []
            if(dur=='20'){
                arr.push(0,20,40)
            }
            if(dur=='30'){
                arr.push(0,30)
            }
            this.setState({schedule:{'val':arr,'type':Int}})
        }else if(this.state.scheduleType=='Daily'){
            let Hr = $("#Hr").val()
            let Min = $("#Min").val()
            let err = $('#scheduleError')
            if(Hr.length<1 || Hr<0 || Hr > 23){
                err.text('Select Valid Hour')
                this.error = true
            }else if(Min.length<1 || Min<0 || Min > 59){
                err.text('Select Valid Minute')
                this.error = true
            }
            else{
                err.text('')
                this.error = false
                this.setState({schedule:{'hour':Hr,'minute':Min}})
            }
        }else if(this.state.scheduleType=='Weekly'){
            let Hr = $("#Hr").val()
            let Min = $("#Min").val()
            let Day = $("#days").val()
            let err = $('#scheduleError')
            if(Hr.length<1 || Hr<0 || Hr > 23){
                err.text('Select Valid Hour')
                this.error = true
            }else if(Min.length<1 || Min<0 || Min > 59){
                err.text('Select Valid Minute')
                this.error = true
            }
            else{
                err.text('')
                this.error = false
                this.setState({schedule:{'dayOfWeek':Day,'hour':Hr,'minute':Min}})
            }
        }else if(this.state.scheduleType=='Monthly'){
            let Hr = $("#Hr").val()
            let Min = $("#Min").val()
            let Date = $("#Date").val()
            let err = $('#scheduleError')
            if(Date.length<1 || Date<1 || Date > 31){
                err.text('Select Valid Date')
                this.error = true
            }else if(Hr.length<1 || Hr<0 || Hr > 23){
                err.text('Select Valid Hour')
                this.error = true
            }else if(Min.length<1 || Min<0 || Min > 59){
                err.text('Select Valid Minute')
                this.error = true
            }
            else{
                err.text('')
                this.error = false
                this.setState({schedule:{'date':Date,'hour':Hr,'minute':Min}})
            }
        }else if(this.state.scheduleType=='Yearly'){
            let Hr = $("#Hr").val()
            let Min = $("#Min").val()
            let Date = $("#Date").val()
            let month = $("#month").val()
            let err = $('#scheduleError')
            if(Date.length<1 || Date<1 || Date > 31){
                err.text('Select Valid Date')
                this.error = true
            }else if(Hr.length<1 || Hr<0 || Hr > 23){
                err.text('Select Valid Hour')
                this.error = true
            }else if(Min.length<1 || Min<0 || Min > 59){
                err.text('Select Valid Minute')
                this.error = true
            }
            else{
                err.text('')
                this.error = false
                this.setState({schedule:{'month':month,'date':Date,'hour':Hr,'minute':Min}})
            }
        }

    }
    handleChange = (e) =>{
        let value = e.target.value
        let id = e.target.id
        if(id=='CC'){
            var flag = value.includes(" ");
            if(flag){
                $("#ccError").text(" * Don't use space between emails")
            }
            else{
                $("#ccError").text("")
                let arr = value.split(";")
                this.setState({[id]:arr})
            }
        }else{
            this.setState({[id]:value})
        }
        if (id == 'scheduleType'){
            if(value == 'Recurring'){
                this.setState({schedule:{'val':[0,20,40],'type':"minute"}})
                this.error = false
            }
            else{
            this.setState({schedule:null})
            this.error = false}
        }
    }
    handleSubmit = (e) =>{
        $('#message').removeClass().text('')
        e.preventDefault();
        if(this.error){
            $('#message').addClass('text-red').text("Fix Formatting Errors")
        }else if(this.state.schedule == null){
            $('#message').addClass('text-red').text("Please Set a schedule")
        }
        else{
            $('#message').removeClass().text('')
            var csrftoken = $.cookie('csrftoken');
            fetch("/api/v1/email/new-email",{
                method: "POST",
                body: JSON.stringify({
                    userID: this.props.data._id,
                    sendTo: this.state.sendTo,
                    CC: this.state.CC,
                    subject: this.state.subject,
                    mailBody: this.state.body,
                    html: this.state.html,
                    scheduleType: this.state.scheduleType,
                    schedule: this.state.schedule,
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json",

                }
            }).then(function(response){
                $('#message').removeClass().text('')
                $("#submit").attr("disabled",false).text('Send Mail');
                if(response.status == 404){
                    $('#message').addClass('text-red').text("Sender Data Not Found")
                    setTimeout(()=>{
                        this.props.history.push('/sender')
                        },2000)
                }
                else if(response.status != 200){
                    $('#message').addClass('text-red').text(`Error ${response.status}: ${response.statusText}`);
                }
                else{
                response.json().then(data =>{
                    alert(data.info)
                    this.props.history.push('/')
                })}
            }.bind(this)).catch(error=>{
                $('#message').addClass('text-red').text(error)
            })
        }
    }
    handleHTML = (e) =>{
        let el = e.target
        if ($(el).prop("checked")){
            this.setState({[el.id]:true})
        }else{
            this.setState({[el.id]:false})
        }
    }
        render() {
            return (
            <main id="main">
                <section class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                    <h2>Create Mails</h2>
                    </div>

                </div>
                </section>
                {this.props.data!=null ?
                <section class="inner-page">
                <div class="container">
                    <h3>Schedule Your Emails</h3>
                    <div className="form-container">
                            <p id="message"></p>
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <input type="email" class="form-control" onChange={this.handleChange} id="sendTo" placeholder="Send To" required />
                                    <small id="UsernameError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" onChange={this.handleChange} id="CC" placeholder='CC (Multiple mail saperated by ";")' required />
                                    <small id="ccError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                <div class="form-group">
                                    <input type="text" onChange={this.handleChange} id="subject" placeholder="Subject" class="form-control" required />
                                    <small id="passwordError" class="form-text text-muted text-red"></small>
                                </div>
                                <div class="form-group">
                                <select className="form-control" onChange={this.handleChange}
                                id="scheduleType" required>
                                    <option selected>Recurring</option>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                                </div>
                                {this.state.scheduleType=="Recurring" &&
                                    <div className="form-group row">
                                    <div className="col-sm-5">
                                        <select className="form-control" onChange={this.scheduleChange}
                                        id="RecurringValue" required>
                                            <option selected>20</option>
                                            <option>30</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-5">
                                        <select className="form-control" onChange={this.scheduleChange}
                                        id="RecurringTime" required>
                                            <option>second</option>
                                            <option selected>minute</option>
                                        </select>
                                    </div>
                                    <small id="scheduleError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                }
                                {this.state.scheduleType=="Daily" &&
                                    <div className="form-group row">
                                    <div className="col-sm-5">
                                        <input type="number" min="0" max="23" placeholder="Hour (00-23)" className="form-control hrs" onChange={this.scheduleChange}
                                        id="Hr" required />                          
                                    </div>
                                    :
                                    <div className="col-sm-5">
                                        <input type="number" min="0" max="59" placeholder="Minute (00-59)" className="form-control mins" onChange={this.scheduleChange}
                                        id="Min" required />
                                    </div>
                                    <small id="scheduleError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                }
                                {this.state.scheduleType=="Weekly" &&
                                    <div className="form-group row">
                                    <div className="col-sm-3">
                                        <select className="form-control" onChange={this.scheduleChange}
                                        id="days" required>
                                            <option value="0" selected>Sunday</option>
                                            <option value="1">Monday</option>
                                            <option value="2">Tuesday</option>
                                            <option value="3">Wednesday</option>
                                            <option value="4">Thursday</option>
                                            <option value="5">Friday</option>
                                            <option value="6">Saturday</option>
                                        </select>                          
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="number" min="0" max="23" placeholder="Hour (00-23)" className="form-control hrs" onChange={this.scheduleChange}
                                        id="Hr" required />                          
                                    </div>
                                    :
                                    <div className="col-sm-3">
                                        <input type="number" min="0" max="59" placeholder="Minute (00-59)" className="form-control mins" onChange={this.scheduleChange}
                                        id="Min" required />
                                    </div>
                                    <small id="scheduleError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                }
                                {this.state.scheduleType=="Monthly" &&
                                    <div className="form-group row">
                                    <div className="col-sm-3">
                                    <input type="number" min="1" max="31" placeholder="Date (1-31)" className="form-control date" onChange={this.scheduleChange}
                                        id="Date" required />                          
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="number" min="0" max="23" placeholder="Hour (00-23)" className="form-control hrs" onChange={this.scheduleChange}
                                        id="Hr" required />                          
                                    </div>
                                    :
                                    <div className="col-sm-3">
                                        <input type="number" min="0" max="59" placeholder="Minute (00-59)" className="form-control mins" onChange={this.scheduleChange}
                                        id="Min" required />
                                    </div>
                                    <small id="scheduleError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                }
                                {this.state.scheduleType=="Yearly" &&
                                    <div className="form-group row">
                                    <div className="col-sm-3">
                                    <select className="form-control" onChange={this.scheduleChange}
                                        id="month" required>
                                            <option value="0" selected>January</option>
                                            <option value="1">February</option>
                                            <option value="2">March</option>
                                            <option value="3">April</option>
                                            <option value="4">May</option>
                                            <option value="5">June</option>
                                            <option value="6">July</option>
                                            <option value="7">Auguest</option>
                                            <option value="8">September</option>
                                            <option value="9">October</option>
                                            <option value="10">November</option>
                                            <option value="11">December</option>
                                        </select>                          
                                    </div>
                                    <div className="col-sm-3">
                                    <input type="number" min="1" max="31" placeholder="Date (1-31)" className="form-control date" onChange={this.scheduleChange}
                                        id="Date" required />                          
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="number" min="0" max="23" placeholder="Hour (00-23)" className="form-control hrs" onChange={this.scheduleChange}
                                        id="Hr" required />                          
                                    </div>
                                    :
                                    <div className="col-sm-3">
                                        <input type="number" min="0" max="59" placeholder="Minute (00-59)" className="form-control mins" onChange={this.scheduleChange}
                                        id="Min" required />
                                    </div>
                                    <small id="scheduleError" class="form-text text-muted text-red">
                                    </small>
                                </div>
                                }
                                <div class="form-group">
                                    <label for="body">You can use HTML tags to customise your Email Body.</label>
                                    <textarea class="form-control" onChange={this.handleChange} id="body" rows="5"></textarea>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" onChange={this.handleHTML} type="checkbox" value="" id="html" />
                                    <label class="form-check-label" for="html">
                                        HTML Body
                                    </label>
                                </div>
                                <br />
                                <button type="submit" id="submit" onClick={this.handleSubmit} class="btn btn-primary">Send Mail</button>
                            </form>
                        <hr />
                        </div>
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
export default withRouter(Create)