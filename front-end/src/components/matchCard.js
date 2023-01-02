import React, {useEffect} from 'react'
import classes from './style/card.module.css'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import * as Yup from 'yup'



const MatchCard = () => {
  const [stadiumData,setStadiumData ] = React.useState([]);



    const initialValues = {
        firstTeam:'',
        secondTeam:'',
        venue:'',
        date:'',
        time:'',
        referee:'',
        firstLinesmen:'',
        secondLinesmen:'',
        seating: [],
        
    }

    function dropDownMenu(option,index) {
        return (
            <option  key={index}className={classes.option} value={index} >{option}</option>
        )
    }
    

    async function getSData() {    
        var config = {
          method: 'get',
          headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
        };
        let response = '';
        try {
    
          response = await axios.get("https://http-fifaqatarworldcup-com.onrender.com/stadiums/all-stadiums",config).then((res) => res.data);
          return (response);
        } catch (error) {
          if (error.response) {
            return (error.response);
          }
        }
        return (response);
      }
    
      React.useEffect(() => {
        (async () => {
          const resp = await getSData();
          setStadiumData(resp);
        })();
      }, []);



    const onSubmit = (data, { resetForm }) => {
        async function sendData() {
            try {
                data.seating = Array.from({length: Number(stadiumData[Number(data.venue)].numSeats)}, (v, i) => 0);
                const request = await axios.post("https://http-fifaqatarworldcup-com.onrender.com/matches/add-match", data, 
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
            <div className={classes.main}>
                <div className={classes.header}>
                    <h1>Match</h1>
                </div>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div className={classes.Teams}>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='firstTeam' placeholder="Team1" autoComplete="off" />
                                    <label className={classes.label}>Team1</label>
                                </div>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='secondTeam' placeholder="Team2" autoComplete="off" />
                                    <label className={classes.label}>Team2</label>
                                </div>
                            </div>

                            <div className={classes.fieldContainer}>
                                <label className={classes.label}>venue</label>
                                <Field as="select" className={classes.input} type="text" name="venue" placeholder="Type here">
                                <option value="" disabled="disabled">Select the venue</option>
                                {stadiumData? stadiumData.map((g, index)=> dropDownMenu(g.venue,index)) : null}
                                </Field>
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
                                    <Field className={classes.field} name='firstLinesmen' placeholder="linesman1" autoComplete="off" />
                                    <label className={classes.label}>First Lineman</label>
                                </div>
                                <div className={classes.fieldContainer}>
                                    <Field className={classes.field} name='secondLinesmen' placeholder="linesman2" autoComplete="off" />
                                    <label className={classes.label}>Second Lineman</label>
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