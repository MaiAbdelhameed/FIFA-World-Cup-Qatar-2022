import React, {useEffect} from 'react'
import classes from './style/card.module.css'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import * as Yup from 'yup'



const StadiumCard = () => {


    const initialValues = {
        venue: '',
        numRows: '',
        numSeats: '',
    }
    

    const onSubmit = (data, { resetForm }) => {
        async function sendData() {
            try {

                console.log("requesting")
                const request = await axios.post("https://http-fifaqatarworldcup-com.onrender.com/stadiums/add-stadium", data, 
                { headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenValue")}` } }).then((res) => {
                    console.log(res)
                })

                resetForm()
                window.location.reload(false);

                

            } catch (err) {
                
            }

        }
        sendData()

    }
    return (
            <div className={classes.main2}>
                <div className={classes.header}>
                    <h1>Stadium</h1>
                </div>
                    <Formik initialValues={initialValues}  onSubmit={onSubmit}>
                        <Form>

                            <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='venue' placeholder="Venue Name" autoComplete="off" />
                                    <label className={classes.label}>Venue Name</label>
                            </div>

                            <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='numRows' placeholder="Rows" autoComplete="off" />
                                    <label className={classes.label}>Number of rows</label>
                            </div>

                            <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='numSeats' placeholder="Seats" autoComplete="off" />
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