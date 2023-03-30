import React, { useEffect, useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Login( {onLogin} ) {
  const [showLogin, setShowLogin] = useState(true);


  return (

    <>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin}/>
          <hr />

          <p>Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) :(
        <>
          <SignupForm onLogin={onLogin} />
          <hr />
          <p>
            Already have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </>
  )
}

export default Login;