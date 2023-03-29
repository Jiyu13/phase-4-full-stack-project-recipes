import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";


function SignupForm() {

    const [newUsers, setNewUsers] = useState([{}])
    const [refreshPage, setRefreshPage] = useState(false)

    useEffect(() => {
        console.log("FETCH! ");
        fetch("/signup")
          .then((res) => res.json())
          .then((data) => {
            setNewUsers(data);
            console.log(data);
          });
    }, [refreshPage]);
    
    const formSchema = yup.object().shape({
        name: yup.string().name("Invalid name").required("Must enter name"),
        password: yup.string().password("Must enter a name"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            password: ""
        },
    
        validationSchema: formSchema,
        onSubmit: (values) => {
        fetch("signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then((res) => {
            if (res.status === 200) {
            setRefreshPage(!refreshPage);
            }
        });
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSUbmit} style={{ margin: "30px" }}>
                <label htmlFor="name">Email Address</label>
                <br />
                <input
                id="name"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>


                <label htmlFor="password">Email Address</label>
                <br />
                <input
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />
                <p style={{ color: "red" }}> {formik.errors.password}</p>
            </form>
        </div>
    )
}

export default SignupForm;