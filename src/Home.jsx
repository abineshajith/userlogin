import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home=()=>{
    const usenavigate=useNavigate();
    
    useEffect(()=>{
        let username=sessionStorage.getItem('username');
        if(username===''||username===null){
            usenavigate('/login')
        }
    },[]);
    return(
        // <div className="header">
        //     <Link to={'/'} >Home</Link>
        //     <Link to={'/login'}>logout</Link>
        //     </div>
        //     <h1 className="text-center">welcome to Aroha Technology</h1> 
        // </div>
        <div>
<Navbar/>
<div>
<h2 style={{textAlign:"center"}}>Welcome to Aroha technology</h2>

</div>


</div>
    )
}
export default Home;