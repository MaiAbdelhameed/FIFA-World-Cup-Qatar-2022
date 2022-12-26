import React from 'react'
import { useState } from 'react';
import classes from './style/auth.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { WindowSharp } from '@mui/icons-material';

const ResetForm = (props) => {

    const [resend, setResend] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
    const [openModal, setOpenModal] = useState(false);
    let navigate = useNavigate();

    function handleModalClose() {
        setOpenModal(false);
        navigate("/auth");
        window.location.reload();

    }
    const style = {
        position: "absolute",
        top: "50%",
        left: "49.5%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "0px",
        boxShadow: 24,
        p: 4,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: "80%"
    };
    let { id } = useParams();

    
    const initialValues = {
        password: '',
        ConfirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        password: Yup.string().required("password field is required"),
        ConfirmPassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    })
    
    const onSubmit = (data, { resetForm }) => {
        setErrorMsg("");
        axios.patch("https://fifa-world-cup.onrender.com/api/user/reset-password", data,{ headers: { Authorization: "Bearer " + id } }).then((res) => {
            resetForm();
            setOpenModal(true);

        }).catch((err) => {
            let val = err.response.data.message.search("E11000");
            if (err.response.data.message === "User not found") {
                console.log(data)
                setErrorMsg("User Already Exists")
            }
            resetForm()
        })
    }
    function clearError() {
        setErrorMsg("")

    }

    return (
        <div className={classes.container}>
           
            <div className={classes.center}>
                <div className={classes.box11}>
                    <h1>Reset Password</h1>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            <div className={classes.fieldContainer}>
                                <Field type="password" className={classes.field} name='password' placeholder="Password" autoComplete="off" />
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
                                <button onClick={clearError} type='submit'>Confirm</button>
                            </div>
                        </Form>
                    </Formik>
                    <Modal open={openModal} onClick={handleModalClose}>
                        <Box sx={style}>
                            <h1 className={classes.boxParagraph}>
                                Password is changed successfully
                            </h1>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>)
}

export default ResetForm
