import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function SignupForm({user, setUser}) {

    let navigate = useNavigate()

    function redirectHome() {
        navigate('/')
    }
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter username"),
        password: yup.string().required("Must enter a password"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            password: ""
        },
    
        validationSchema: formSchema,
        onSubmit: (values) => {
        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then((res) => {
            if (res.status === 201) {
                redirectHome()
                res.json().then(user => {
                    setUser(user)
                    // console.log(user)
                })
            }
        });
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <h1>Sign Up</h1>
                <label htmlFor="name">Username:</label>
                <br />
                <input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>


                <label htmlFor="password">Password:</label>
                <br />
                <input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{ color: "red" }}> {formik.errors.password}</p>


                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignupForm;