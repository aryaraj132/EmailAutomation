import React, { Component } from 'react';
import {Link,withRouter} from'react-router-dom';
class History extends Component {
    constructor(props){
        super(props);
        this.state={
            load:false,
        }
        this.data = null
    }
    componentDidMount(){
        document.title = "History";
        if(this.props.data ==null){
            this.props.history.push("/login");
        }else{
        this.fetchData();}
    }
    fetchData=()=>{
        fetch("/api/v1/email/get-mailHist/"+this.props.data._id).then((response) => response.json())
            .then((data) => {
                let arr = []
                data.forEach(obj => {
                    if(obj.Count > 0){
                        arr.push(obj)
                    }
                });
                if (arr.length>0) {
                    this.data = arr
                }
                this.setState({load:true})
            });
    }
        render() {
            return (
            <main id="main">
                <section class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                    <h2>History</h2>
                    </div>

                </div>
                </section>
                <section class="inner-page">
                <div class="container">
                <h3>Sent Emails</h3>
                    {this.state.load &&
                    <>
                    {
                        this.data == null || this.data.length==0 ?
                        <h2>No Sent Emails Found</h2>:
                        <div className="position-relative d-flex flex-wrap flex-row justify-content-around">
                        {this.data.map((data,idx)=>{
                            return(
                                <div key={idx} className="card my-2 mx-2">
                                    <div class="card-body">
                                        <p>
                                            TO : {data.sendTo}<br />
                                            CC : {data.CC}<br />
                                            Subject : {data.Subject}<br />
                                            Body : {data.Body}<br />
                                            Schedule : <br />
                                            <span className="float-right">{data.ScheduleType}</span><br />
                                            <span className="float-right">
                                                {data.ScheduleValue.month!= undefined && data.ScheduleValue.month + ", "}{data.ScheduleValue.date!= undefined && data.ScheduleValue.date + ", "}{data.ScheduleValue.day!= undefined && data.ScheduleValue.day + ", "}{data.ScheduleValue.hour!= undefined && data.ScheduleValue.hour + ", "}{data.ScheduleValue.minute!= undefined && data.ScheduleValue.minute + ", "}{data.ScheduleValue.val!= undefined && <> {data.ScheduleValue.val.length==3 ? "20, " : "30, "}</>}{data.ScheduleValue.type!= undefined && data.ScheduleValue.type + ", "}
                                            </span><br />
                                            Sent : {data.Count} times<br />
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    }
                    </>
                    }
                </div>
                </section>
            </main>
        )}
}
export default withRouter(History)