import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./style/updateinfo.module.css";
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
  
  export default function UpdateInfo() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <div className={classes.btn}>
          <button type="submit" onClick={handleOpen}>
            Update user info
          </button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <div className={classes.container}>
            <div className={classes.center}>
              <Box className={classes.box1} sx={style}>
                <Formik>
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
                        name="fname"
                        placeholder="first name"
                        autoComplete="off"
                      />
                      <label className={classes.label}> First name</label>
                      <ErrorMessage name="username" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="lname"
                        placeholder="last name"
                        autoComplete="off"
                      />
                      <label className={classes.label}>Last Name</label>
                      <ErrorMessage name="username" component="span" />
                    </div>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="bdate"
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
                        name="password"
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
                      <button type="submit" onClick={handleClose}>
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
  