import React, {useEffect} from 'react'
import classes from './style/card.module.css'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import * as Yup from 'yup'



const MatchCard = () => {


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
                    <h1>Match</h1>
                </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            <div className={classes.Teams}>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='team1' placeholder="Team1" autoComplete="off" />
                                    <label className={classes.label}>Team1</label>
                                </div>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='team2' placeholder="Team2" autoComplete="off" />
                                    <label className={classes.label}>Team2</label>
                                </div>
                            </div>

                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='venue' placeholder="Match Venue" autoComplete="off" />
                                <label className={classes.label}>Match Venue</label>
                            </div>

                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} type="date" name="date" placeholder="Type here"/>
                                <label className={classes.label}>Match Date</label>
                            </div>
                            
                            <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='time' placeholder="Match time" autoComplete="off" />
                                    <label className={classes.label}>Match Time</label>
                            </div>

                            <div className={classes.fieldContainer}>
                                <Field className={classes.field} name='referee' placeholder="referee" autoComplete="off" />
                                <label className={classes.label}> Main Referee</label>
                            </div>

                            <div className={classes.Teams}>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='linesman1' placeholder="linesman1" autoComplete="off" />
                                    <label className={classes.label}>First Lineman</label>
                                </div>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='linesman1' placeholder="linesman2" autoComplete="off" />
                                    <label className={classes.label}>First Lineman</label>
                                </div>
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

export default MatchCard