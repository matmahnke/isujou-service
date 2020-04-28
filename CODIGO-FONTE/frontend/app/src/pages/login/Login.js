import React from 'react';
import * as yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import './Login.css';
import axios from 'axios';
import { History } from '../../components/History'

const Login = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/auth', values)
            .then(resp => {
                const { data } = resp;
                if (data) {
                    localStorage.setItem('Authorization', data)
                    History.pushState('/')
                }
            })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })
    return (
        <>
            <h1>Login</h1>
            <p>Fill the fields to continue</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}>
                <Form className="Login">
                    <div className="Login-Group">
                        <Field name="email" className="Login-Field" />
                        <ErrorMessage component="span" name="email" className="Login-Error">
                        </ErrorMessage>
                    </div>
                    <div className="Login-Group">
                        <Field name="password" className="Login-Field" />
                        <ErrorMessage component="span" name="password" className="Login-Error">
                        </ErrorMessage>
                    </div>
                    <button className="Login-btn" type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </>
    )
};

export default Login;