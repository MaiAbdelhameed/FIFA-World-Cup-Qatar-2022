import React, { useState } from 'react'
import classes from './style/auth.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';

const Signup = (props) => {
    const [errorMsg, setErrorMsg] = useState("");
    

    const initialValues = {
        email: '',
        pass: '',
        ConfirmPassword: '',
        username: '',
        firstName:'',
        lastName:'',
        birthDate:'',
        nationality:'',
        gender:'',
        role:'',

    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().min(3).trim().email('Invalid email address').required("Email field is required"),
        pass: Yup.string().required("password field is required"),
        ConfirmPassword: Yup.string().when("pass", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("pass")],
                "Both password need to be the same"
            )
        }),
        username: Yup.string().trim().required("field can't be empty")

    })
    const onSubmit = (data, { resetForm }) => {
                    console.log(data)

        async function sendRequest() {
            try {
                data.username=data.username.trim();
                data.username=data.username.toLowerCase();
                const request = await axios.post("https://http-fifaqatarworldcup-com.onrender.com/auth/sign-up", data);
                resetForm()

            }
            catch (err) {
                let val = err.response.data.message.search("E11000");
                console.log(val);
                if (val !== -1) {
                    console.log(data)
                    setErrorMsg("User Already Exists")
                }
                resetForm()
            }
        }

        sendRequest()

    }

    return (

        <div className={classes.container}>
            <div className={classes.center}>
                <div className={classes.box1}>
                    <div className={classes.header1}>
                        <div className={classes.header2}>
                            <h1>Sign up</h1>
                        </div>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='username' placeholder="username" autoComplete="off" />
                                <label className={classes.label}> Username</label>
                                <ErrorMessage name='username' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='firstName' placeholder="first name" autoComplete="off" />
                                <label className={classes.label}> First name</label>
                                <ErrorMessage name='username' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='lastName' placeholder="last name" autoComplete="off" />
                                <label className={classes.label}>Last Name</label>
                                <ErrorMessage name='username' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <h2>Gender</h2>
                                <label>
                                    <Field type="radio" name="gender" value="male" />
                                Male</label>
                                <label>
                                    <Field type="radio" name="gender" value="female" />
                                Female</label>
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='birthDate' placeholder="birthdate" autoComplete="off" />
                                <label className={classes.label}>Birth date</label>
                                <ErrorMessage name='username' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='nationality' placeholder="nationailty" autoComplete="off" />
                                <label className={classes.label}>Nationailty</label>
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='email' placeholder="Email address" autoComplete="off" />
                                <label className={classes.label}> Email address</label>
                                <ErrorMessage name='email' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <h2>Role</h2>
                                <label>
                                    <Field type="radio" name="role" value="manager" />
                                Manager</label>
                                <label>
                                    <Field type="radio" name="role" value="fan" />
                                Fan</label>
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field type="password" className={classes.field} name='pass' placeholder="Password" autoComplete="off" />
                                <label className={classes.label}> Password</label>
                                <ErrorMessage name='password' component="span" />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field type="password" className={classes.field} name='ConfirmPassword' placeholder="ConfirmPassword" autoComplete="off" />
                                <label className={classes.label}> Confirm Password</label>
                                <ErrorMessage name='ConfirmPassword' component="span" />
                            </div>
                            <div className={classes.errorMsg}>{errorMsg}</div>
                            <div className={classes.btn}>
                                <button type='submit'>Sign up</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className={classes.box2}>
                    <p>Already have an account? <span onClick={props.signinHandeler}> Log In</span></p>
                </div>
            </div>
        </div>
    )
}

export default Signup