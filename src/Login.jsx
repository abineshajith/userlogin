import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './App.css'

const Login=()=>{
    const [username,usernameupdate]=useState('');
    const [password,passwordupdate]=useState('');

    const navigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[])

   const Proceedlogin=(e)=>{
    e.preventDefault();
    if(Validation){
        // console.log("welcome")
        fetch(" http://localhost:8000/user/"+username).then((res)=>{
            return res.json();

        }).then((resp)=>{
            console.log(resp)
            if(Object.keys(resp).length===0){
                toast.error('please enter the valid details')
            }else{
                if(resp.password===password){
                    toast.success('successfully login')
                    sessionStorage.setItem('username',username);
                    navigate('/')

                }else{
                    toast.error('please enter the valid password')
                }
            }
        }).catch((err)=>{
            toast.error('Login failed due to the particular isssue:'+err.message);
        });
    }
   }

    const Validation=()=>{
        let result=true;
        if(username==='' || username===null){
            result=false;
            toast.warning('invalid details')
        }
        if(password==='' || password===null){
            result=false;
            toast.warning('invalid entry')
        }
    }
    return(
        
        <div className="row mt-5">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={Proceedlogin}>
                    <div className="card">
                        <div className="card-header">
                            <h2>User login</h2>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name</label><span className="errmsg">*</span>
                                    <input value={username} onChange={e=>usernameupdate(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>password</label><span className="errmsg">*</span>
                                    <input type="password" value={password} onChange={e=>passwordupdate(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="card-footer">
                                    <button  type="submit" className="btn btn-primary ">Login</button>
                                    <Link className="btn btn-success" to={'/register'}> new user</Link>

                                </div>

                            </div>

                        </div>

                    </div>
                </form>

            </div>
            
        </div>
        
    )
}

export default Login;