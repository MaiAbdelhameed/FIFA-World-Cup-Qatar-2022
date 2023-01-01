import React from 'react'
import classes from './style/listItem.module.css'
import axios from 'axios';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

function handleUpdate(data) {
    //TODO
}


const MatchListItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const handleDelete = () =>  { 
        (async () => {
            var config = {
                method: 'delete',
                headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
              };
            let response = '';
            try {

                response = await axios.delete("https://http-fifaqatarworldcup-com.onrender.com/matches/delete/" + props.id ,config).then((res) => res.data);
    
        
                return (response);
              } catch (error) {
                if (error.response) {
                  return (error.response);
                }
              }
              return (response);
    
    })();
    }

    return(
      <div className={classes.container}>
      <h2 className={classes.title}>
        {props.team1} vs {props.team2}
      </h2>
      <h3 className={classes.date}>{props.date}</h3>
      <div className={classes.btn}>
        <button onClick={handleOpen}>update</button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div>
          <div className={classes.center}>
            <Box className={classes.box1} sx={style}>
              <Formik>
                <Form>
                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="firstTeam"
                      placeholder="Team1"
                      autoComplete="off"
                    />
                    <label className={classes.label}>Team1</label>
                  </div>
                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="secondTeam"
                      placeholder="Team2"
                      autoComplete="off"
                    />
                    <label className={classes.label}>Team2</label>
                  </div>
                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="venue"
                      placeholder="Match Venue"
                      autoComplete="off"
                    />
                    <label className={classes.label}>Match Venue</label>
                  </div>

                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      type="date"
                      name="date"
                      placeholder="Type here"
                    />
                    <label className={classes.label}>Match Date</label>
                  </div>

                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="time"
                      placeholder="Match time"
                      autoComplete="off"
                    />
                    <label className={classes.label}>Match Time</label>
                  </div>

                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="referee"
                      placeholder="referee"
                      autoComplete="off"
                    />
                    <label className={classes.label}> Main Referee</label>
                  </div>
                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="firstLinesmen"
                      placeholder="linesman1"
                      autoComplete="off"
                    />
                    <label className={classes.label}>First Lineman</label>
                  </div>
                  <div className={classes.fieldContainer}>
                    <Field
                      className={classes.field}
                      name="secondLinesmen"
                      placeholder="linesman2"
                      autoComplete="off"
                    />
                    <label className={classes.label}>First Lineman</label>
                  </div>
                  <div className={classes.errorMsg}>{}</div>
                  <div className={classes.btn}>
                    <button type="submit">Update changes</button>
                  </div>
                </Form>
              </Formik>
            </Box>
          </div>
        </div>
      </Modal>
      <div className={classes.btn}>
        <button className={classes.btn} onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
    )
}

export default MatchListItem