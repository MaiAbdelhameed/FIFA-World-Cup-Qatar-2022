import React,{useEffect} from 'react'
import classes from './style/nav.module.css'
import { useState } from 'react'
import { Link, NavLink} from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const Data=  useSelector(state => state);
    const [logged,setLogged]=useState("");


   
    useEffect(() => {
        setLogged(sessionStorage.getItem("ID"))
    }); 
    
    function handleLogOut()
    {
        sessionStorage.clear();
    }

    let navigate = useNavigate();

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }


  return (
    <div className={classes.nav}>
        <div className={classes.logoContainer}>
            <div className={classes.imgContainer}>
            <Link to="/"></Link>
            </div>
        </div>
    

            <div className={classes.navOptions}>
            <div className={` ${classes.options}`}>
            <ul className={classes.links}>
                <li  className={classes.op}>
                <NavLink to="/" exact activeClassName={classes.activeLink}>  HOME  </NavLink>
                </li>
                <li   className={classes.op}>
                <NavLink to={"/Reserve/"} onClick={() => changeLocation("/Reserve/"+sessionStorage.getItem("username"))} activeClassName={classes.activeLink}> Reserve </NavLink>
                </li>
                <li  className={classes.op}>
                <NavLink  to="/Manager" activeClassName={classes.activeLink}> Manage </NavLink>
                </li>
                {
                    logged!==null ?
                    <li   className={classes.login}>
                    <NavLink to="/auth" activeClassName={classes.activeLinkL} onClick={handleLogOut} className={classes.loginL}> LogOut </NavLink>
                    </li>
                    :
                    <li   className={classes.login}>
                    <NavLink to="/auth" activeClassName={classes.activeLinkL} className={classes.loginL}> LOGIN </NavLink>
                    </li>
                }
            </ul>
            </div>
           
        </div>
                  
    </div>
  )
}

export default Nav
