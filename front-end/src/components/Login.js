import React from 'react'
import { useState } from 'react'
import classes from './style/auth.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';

import * as Yup from 'yup'
const Login = (props) => {
    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();

    const initialValues = {
        username: '',
        pass: '',
    }

    const validationSchema = Yup.object().shape({ 
        username: Yup.string().trim().required("username or email can't be empty"),
        pass: Yup.string().trim().required("password field is required")

    })
    const onSubmit = (data, { resetForm }) => {
        // console.log(data)
        async function sendData() {
            try {
                
                const request = await axios.post("https://http-fifaqatarworldcup-com.onrender.com/auth/login", data)
                console.log(data)

                sessionStorage.setItem("tokenValue", request.data.token)
                sessionStorage.setItem("ID", request.data.user._id)
                sessionStorage.setItem("username", request.data.user.username)
                sessionStorage.setItem("role", request.data.user.role)

                sessionStorage.setItem("Validity", 0)
                
                resetForm()
                if(sessionStorage.getItem("role") === "fan")
                    navigate("/Reserve/"+request.data.user.username);
                else if(sessionStorage.getItem("role") === "manager")
                    navigate("/Manager/"+request.data.user.username);
                else
                    navigate("/Admin");

                window.location.reload(false);
                dispatch({ type: "Login", login: true, id: request.data._id })

                

            } catch (err) {
                if (err.response.data.error === "Error: User is not found") {
                    setErrorMsg("User Doesn't Exist")
                }
                if (err.response.data.error === "Error: Password is incorrect") {
                    setErrorMsg("Password is not correct")
                }
                resetForm()
            }

        }
        sendData()

    }

    return (
        <div className={classes.container1} >
            <div className={classes.center}>
                <div className={classes.box1}>
                    <div className={classes.header2}>
                        <h1>Login</h1>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>

                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='username' placeholder="username" autoComplete="off" />
                                <label className={classes.label}>Username or email</label>
                                <ErrorMessage name='username' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='pass' placeholder="Password" autoComplete="off" type="password" />
                                <label className={classes.label}> Password</label>
                                <ErrorMessage name='password' component="span" />
                            </div>
                            <div className={classes.errorMsg}>{errorMsg}</div>
                            <div className={classes.btn}>
                                <button type='submit'>Login</button>
                            </div>
                        </Form>
                    </Formik>

                </div>
                <div className={classes.box2}>
                    <p>Don't have an account? <span onClick={props.signupHandeler}> Sign up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login