import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import NavBar from "./NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useGoogle from "../hooks/useGoogle";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const { loading, error, handleFetch } = useFetch(process.env.REACT_APP_SIGNUP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const { handleGoogle, gLoading, gError } = useGoogle(process.env.REACT_APP_SIGNUP_URL);
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await handleFetch({
        body: JSON.stringify({ email, password, name, mobile }),
      });
      console.log(response);
      if (response?.message === "Signup was successful") {
        localStorage.setItem("user", JSON.stringify(response?.user));
        navigate("/profile");
      } else {
        console.error(response?.message,"//////");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <br />
      <Button component={Link} to="/" variant="contained" color="primary">
        <ArrowBackIcon style={{ marginRight: "5px" }} /> Back
      </Button>
      <br />
      <br />
      <header style={{ textAlign: "center" }}>
        <h1>REGISTER TO CONTINUE</h1>
      </header>
      <br />
      <main>
        <Box textAlign="center" mt={2}>
          <Typography variant="h4">Create an Account</Typography>
          <form onSubmit={handleSignUp} style={{ margin: "0 auto", maxWidth: "400px" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? (
              <div>Loading....</div>
            ) : (
              <>
                <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField label="Mobile" variant="outlined" fullWidth margin="normal" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={()=>{handleSignUp()}} type="submit" variant="contained" color="primary" fullWidth>
                  Sign Up
                </Button>
              </>
            )}
          </form>
        </Box>
        <Box
          mt={2}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {gError && <p style={{ color: "red" }}>{gError}</p>}
          {gLoading ? <div>Loading....</div> : <div id="signUpDiv" data-text="signup_with"></div>}
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Already have an account?</Typography>
          <Button component={Link} to="/login" variant="contained" color="primary">
            Email/Password Login
          </Button>
        </Box>
      </main>
      <footer></footer>
    </>
  );
};

export default SignUp;
