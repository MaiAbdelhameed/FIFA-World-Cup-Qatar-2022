import React from 'react'
import { useState, useEffect } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
// import ResetForm from '../components/ResetForm'
import classes from './style/authpage.module.css'
import cup from '../img/cup.jpg'
const Auth = (props) => {
    const [haveAcount, setHaveAcount] = useState(true);

    const signinHandeler = () => {
        setHaveAcount(true)
        
    }
    const signupHandeler = () => {
        setHaveAcount(false)
    }

    return (
        <div >
            <div className={classes.main}>
                <div className={classes.dataarea}>
                    <div className={classes.info}>
                    </div>
                    <div className={classes.log}>

                                <div>
                                    {
                                        haveAcount ? <Login signupHandeler={signupHandeler} /> : <Signup signinHandeler={signinHandeler} />
                                    }
                                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth