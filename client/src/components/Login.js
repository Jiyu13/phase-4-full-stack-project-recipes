import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Login( {onLogin, user, setUser} ) {
  const [showLogin, setShowLogin] = useState(true);

  function handleLogin() {
    console.log("login!")
  }

  // useEffect(() => {
  // // auto-login
  // fetch("/check_session").
  // then((r) => {
  //   if (r.ok) {
  //     r.json().then((user) => {
  //       setUser(user)
  //     });
  //   }
  // });
  // }, []);

  // // if (!user) return <Login user={user} setUser={setUser} />;

  return (

    <>
      {showLogin ? (
        <>
          <LoginForm onLogin={handleLogin} user={user} setUser={setUser}/>
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