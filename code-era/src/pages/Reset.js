import React , {Component} from "react";

export default class Reset extends Component{
    constructor(props){
        super(props);
        this.state={
            student_id:0,
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e){
        e.preventDefault();
        const{student_id}=this.state;
        // console.log(student_id);
        fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        student_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert(data.status);
        // this.setState({ userData: data.data });
      });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>
                    Forgot Password
                </h3>
                <div className="mb-3">
                    <label>
                        Enter Student ID
                    </label>
                    <input type="number" className="form-control" placeholder="Student ID" onChange={(e)=>this.setState({student_id:e.target.value})}/>
                    
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            
            </form>
        );
    }
}