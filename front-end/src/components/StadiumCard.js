import React, {useEffect} from 'react'
import classes from './style/card.module.css'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import * as Yup from 'yup'



const StadiumCard = () => {


    const initialValues = {
        team1: '',
        team2: '',
        venue: '',
        
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
                window.location.reload(false);
            } catch (err) {
                
            }

        }
        sendData()
    }

    return (
            <div className={classes.main}>
                <div className={classes.header}>
                    <h1>Stadium</h1>
                </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>

                            <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='shape' placeholder="Shape" autoComplete="off" />
                                    <label className={classes.label}>Stadium Shape</label>
                            </div>

                            <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='seats' placeholder="Seats" autoComplete="off" />
                                    <label className={classes.label}>Number of seats</label>
                            </div>


                            <div className={classes.errorMsg}>{}</div>
                            <div className={classes.btn}>
                                <button type='submit'>Submit</button>
                            </div>
                        </Form>
                    </Formik>
            </div>
    )
}

export default StadiumCard