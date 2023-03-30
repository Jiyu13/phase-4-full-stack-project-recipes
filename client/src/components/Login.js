import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Login( {user, setUser} ) {
  const [showLogin, setShowLogin] = useState(true);

  return (

    <>
      {showLogin ? (
        <>
          <LoginForm user={user} setUser={setUser}/>
          <hr />

          <p>Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) :(
        <>
          <SignupForm user={user} setUser={setUser}/>
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