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
        emailorusername: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({ 
        emailorusername: Yup.string().trim().required("username or email can't be empty"),
        password: Yup.string().trim().required("password field is required")

    })
    const onSubmit = (data, { resetForm }) => {
        async function sendData() {
            try {
                data.emailorusername=data.emailorusername.trim();
                data.emailorusername=data.emailorusername.toLowerCase();
                const request = await axios.post("https://fifa-world-cup.onrender.com/api/user/login", data)
                sessionStorage.setItem("tokenValue", request.data.token)
                sessionStorage.setItem("ID", request.data.user._id)
                sessionStorage.setItem("username", request.data.user.username)
                sessionStorage.setItem("Validity", 0)
                
                resetForm()
                navigate("/PredictionGame/"+request.data.user.username);
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
                                <Field className={classes.field} name='emailorusername' placeholder="username" autoComplete="off" />
                                <label className={classes.label}>Username or email</label>
                                <ErrorMessage name='username' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='password' placeholder="Password" autoComplete="off" type="password" />
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