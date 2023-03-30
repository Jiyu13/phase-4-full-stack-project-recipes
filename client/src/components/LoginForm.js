import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function LoginForm({onLogin, user, setUser}) {
    let navigate = useNavigate()

    function redirectHome() {
        navigate('/')
    }
    
    const [refreshPage, setRefreshPage] = useState(false)

    
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter usernname"),
        password: yup.string().required("Must enter a password"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            password: ""
        },
    
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status === 200) {
                onLogin()
                // redirect to home page ????
                redirectHome()
                res.json().then(user => {
                    setUser(user)
                    console.log(user)
                })

                }
            });
        },
    });

    

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <h1>Login</h1>
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
                    type="password"
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

export default LoginForm;