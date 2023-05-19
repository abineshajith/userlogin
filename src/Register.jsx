import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[password,passwordchange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[country,countrychange]=useState("india");
    const[address,addresschange]=useState("");
    const[gender,genderchange]=useState("male");

    const navigate=useNavigate();

    const Isvalidation=()=>{
        let isproceed=true;
        let errormessage='please enter the value in ';
        if(id===null || id===''){
            isproceed=false
            errormessage+='username'
        }
        if(name===null || name===''){
            isproceed=false
            errormessage+=' ,Full name'
        }
        if(password===null || password===''){
            isproceed=false
            errormessage+=' ,password'
        }
        if(email===null || email===''){
            isproceed=false
            errormessage+=' e-mail'
        }
        if(!isproceed){
            toast.warning(errormessage)
        }
        else{
            if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)){

            }
            else{
                isproceed=false;
                toast.warning('please enter the valid e-mailid');
            }
        }
        return isproceed;
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        let regobj={id,name,password,email,phone,country,address,gender};
        if(Isvalidation()){
        //console.log(regobj);
        fetch(" http://localhost:8000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regobj )
        }).then((res)=>{
            toast.success('Register successfully')
            navigate('/login');
        }).catch((err)=>{
            toast.error('Failer:'+err.message)
        });
    }
    }
    return ( 
        <div className="mt-5">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                        <h1>User Register</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>User Name</label><span className="errmsg">*</span>
                                        <input  value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>Password</label><span className="errmsg">*</span>
                                        <input  value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name</label><span className="errmsg">*</span>
                                        <input  value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>e-mail</label><span className="errmsg">*</span>
                                        <input  value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone Number</label><span className="errmsg">*</span>
                                        <input  value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country</label><span className="errmsg">*</span>
                                        <select value={country} onChange={e=>countrychange(e.target.value)} className="form-control">
                                            <option value="india">India</option>
                                            <option value="Usa">usa</option>
                                            <option value="singapore">singapore</option>

                                        </select>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Address</label><span className="errmsg">*</span>
                                        <textarea value={address} onChange={e=>addresschange(e.target.value)} className="form-control"></textarea>
                                    </div>
                                    </div>
                                    <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br/>
                                        <input type="radio" checked={gender==='male'} onChange={e=>genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio"  checked={gender==='female'} onChange={e=>genderchange(e.target.value)}  name="gender" value="female" className="app-check"></input>
                                        <label>FeMale</label>
                                    </div>
                                    </div>
                                    
                                    

                            </div>

                        </div>
                        <div className="card-footer">

                            <button type="submit" className="btn btn-primary">Register </button>
                            <Link to={'/login'}><a className="btn btn-danger"> back</a></Link>

                        </div>

                    </div>

                </form>

            </div>
            
        </div>
     );
}
 
export default Register;