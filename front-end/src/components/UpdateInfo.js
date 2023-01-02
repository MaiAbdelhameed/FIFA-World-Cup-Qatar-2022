import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classes from "./style/updateinfo.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import axios from 'axios';
import { concat } from "lodash";


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


  
  export default function UpdateInfo() {

    const [open, setOpen] = useState(false);
    const [ProfileInfo,setProfileInfo ] = React.useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const handleClose = () => setOpen(false);

    const initialValues = {
      email: ProfileInfo.email,
      pass: ProfileInfo.pass,
      ConfirmPassword: ProfileInfo.pass,
      username: ProfileInfo.username,
      firstName: ProfileInfo.firstName,
      lastName: ProfileInfo.lastName,
      birthDate: formatDate(ProfileInfo.birthDate),
      nationality: ProfileInfo.nationality,
  }

  function formatDate(date)
  {
    return(date?date.slice(0,10):null)
  }
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().min(3).trim().email('Invalid email address').required("Email field is required"),
      pass: Yup.string().required("password field is required"),
      ConfirmPassword: Yup.string().when("password", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
              [Yup.ref("pass")],
              "Both password need to be the same"
          )
      }),
      username: Yup.string().trim().required("field can't be empty")

  }) 


    const onSubmit = (data) => {
      console.log(data)

      async function sendRequest() {
        try {
            console.log("here")
            const request = await axios.put("https://http-fifaqatarworldcup-com.onrender.com/users/update/" + sessionStorage.getItem("ID"), data,
            { headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenValue")}` } }).then((res) => res.data);
            console.log(request)
            setProfileInfo(request);

    
        }
        catch (err) {
            let val = err.response.data.message.search("E11000");
            console.log(val);
        }
    }
    
      sendRequest()
      setOpen(false)
  }

  async function GetUserProfile() {
    var config = {
        method: 'get',
        headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
      };
    let response = '';
  try {
    response = await axios.get("https://http-fifaqatarworldcup-com.onrender.com/users/single-user/" + sessionStorage.getItem("ID"),config).then((res) => res.data);
    // console.log(response)
    
    // setProfileInfo(response);


    return (response);
  } catch (error) {
    if (error.response) {
      return (error.response);
    }
  }
  return (response);
}

  const handleOpen = () => {

      (async () => {
        const resp = await GetUserProfile();
        setProfileInfo(resp);

            // console.log(ProfileInfo)
      })();


    setOpen(true);
  }
  useEffect(() => {
    // console.log(ProfileInfo);
    console.log(initialValues);
 }, [ProfileInfo]);
 

    return (
      <div>
        <div className={classes.btn}>
          <button type="submit" onClick={handleOpen}>
            Update Profile
          </button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <div className={classes.container}>
            <div className={classes.center}>
              <Box className={classes.box1} sx={style}>
                <Formik initialValues={initialValues}enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
                  <Form>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="username"
                        placeholder="username"
                        autoComplete="off"
                        disabled
                      />
                      <label className={classes.label}> Username</label>
                      <ErrorMessage name="username" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="firstName"
                        placeholder="first name"
                        autoComplete="off"
                      />
                      <label className={classes.label}> First name</label>
                      <ErrorMessage name="username" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="lastName"
                        placeholder="last name"
                        autoComplete="off"
                      />
                      <label className={classes.label}>Last Name</label>
                      <ErrorMessage name="username" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="birthDate"
                        placeholder="birthdate"
                        autoComplete="off"
                      />
                      <label className={classes.label}>Birth date</label>
                      <ErrorMessage name="username" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="nationality"
                        placeholder="nationailty"
                        autoComplete="off"
                      />
                      <label className={classes.label}>Nationailty</label>
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="email"
                        placeholder="Email address"
                        autoComplete="off"
                        disabled
                      />
                      <label className={classes.label}> Email address</label>
                      <ErrorMessage name="email" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        type="password"
                        className={classes.field}
                        name="pass"
                        placeholder="Password"
                        autoComplete="off"
                      />
                      <label className={classes.label}> New Password</label>
                      <ErrorMessage name="password" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        type="password"
                        className={classes.field}
                        name="ConfirmPassword"
                        placeholder="ConfirmPassword"
                        autoComplete="off"
                      />
                      <label className={classes.label}> Confirm Password</label>
                      <ErrorMessage name="ConfirmPassword" component="span" />
                    </div>
                    <div className={classes.btn}>
                      <button type="submit" >
                        Update
                      </button>
                    </div>
                  </Form>
                </Formik>
              </Box>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  