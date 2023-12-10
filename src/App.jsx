import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import * as React from "react";
import Stack from "@mui/material/Stack";

// import Button from "./MUI_components/Button"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import Select from "./MUI_components/Select";

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate as Navigate,
} from "react-router-dom";
const BasicTextFields = ({ fn, field, type, required, val }) => {
  // console.log(field," ",type)

  // if (field === "Password" || field === "Confirm Password") {
  //   if (password != cpassword) {
  //     // setFlag(true)
  //     console.log("password do not match");
  //   }
  // }
  return (
    <Box
      // component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
        value={val}
        required={required}
        id="outlined-basic"
        label={field}
        type={type}
        variant="outlined"
        onChange={(e) => {
          fn(e.target.value);
        }}
      />
    </Box>
  );
};

const RegPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cpassword, setCpassword] = useState("");

  // const [pass1, setPass1] = useState("");
  // const [pass2, setPass2] = useState("");
  // const [flag1, setFlag1] = useState(false);

  const [flag, setFlag] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  const BasicButtons = ({ text }) => {
    return (
      // <Stack spacing={2} direction="row">
      <Button style={{ width: "100%" }} type="submit" variant="contained">
        {text}
      </Button>
      // </Stack>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{ textAlign: "center", borderStyle: "groove", padding: "1rem" }}
      >
        <h1 style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
          Registration
        </h1>
        <form autoComplete="on" onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <BasicTextFields
              fn={setUsername}
              val={username}
              required={true}
              field="Username"
              type="text"
            />
            <BasicTextFields
              fn={setEmail}
              val={email}
              required={true}
              field="Email"
              type="email"
            />
          </div>
          {/* <div style={{ display: "flex", flexDirection: "row" }}>
            <BasicTextFields
              fn={setPassword}
              val={password}
              required={true}
              field="Password"
              type="password"
            />
            <BasicTextFields
              fn={setCpassword}
              val={cpassword}
              required={true}
              field="Confirm Password"
              type="password"
            />
            
          </div> */}

          <div style={{ display: "flex", flexDirection: "row" }}>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={
                  password != cpassword
                    ? true
                    : false || cpassword.length <= 8
                    ? true
                    : false
                }
                value={password}
                required={true}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                helperText={
                  password != cpassword
                    ? "Passwords do not match"
                    : "" || cpassword.length <= 8
                    ? "Password length should be greater than 8"
                    : ""
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={
                  password != cpassword
                    ? true
                    : false || cpassword.length <= 8
                    ? true
                    : false
                }
                value={cpassword}
                required={true}
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                helperText={
                  password != cpassword
                    ? "Passwords do not match"
                    : "" || cpassword.length <= 8
                    ? "Password length should be greater than 8"
                    : ""
                }
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
              />
            </Box>
          </div>
          <br />
          {/* <Select
          fieldName="Select Your product Category"
          item1="Product Management"
          item2="General Management"
          item3="Digital Transformation"
        /> */}
          {/* <br /> */}
          <BasicButtons text="Sign up" />
        </form>
        <h4 style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
          Already a User?
          <Link to="/Login">
            <a href="url">Login</a>
          </Link>
        </h4>
        <br />
      </div>
    </div>
  );
};
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cpassword, setCpassword] = useState("");

  // const [pass1, setPass1] = useState("");
  // const [pass2, setPass2] = useState("");
  // const [flag1, setFlag1] = useState(false);

  const [flag, setFlag] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  const BasicButtons = ({ text }) => {
    return (
      // <Stack spacing={2} direction="row">
      <Button style={{ width: "100%" }} type="submit" variant="contained">
        {text}
      </Button>
      // </Stack>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderStyle: "groove",
          padding: "2.25rem",
        }}
      >
        <h1 style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
          Login
        </h1>
        <form autoComplete="on" onSubmit={handleSubmit}>
          <div
          // style={{ display: "flex", flexDirection: "row" }}
          >
            {/* <BasicTextFields
              fn={setUsername}
              val={username}
              required={true}
              field="Username or Email"
              type="text"
            /> */}
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={username}
                required={email ? false : true}
                id="outlined-basic"
                label="Username"
                type="text"
                variant="outlined"
                // helperText={
                //   password != cpassword
                //     ? "Passwords do not match"
                //     : "" || cpassword.length <= 8
                //     ? "Password length should be greater than 8"
                //     : ""
                // }
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Box>
          </div>

          <h4 style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
            OR
          </h4>

          <div
          // style={{ display: "flex", flexDirection: "row" }}
          >
            {/* <BasicTextFields
              fn={setUsername}
              val={username}
              required={true}
              field="Username or Email"
              type="text"
            /> */}
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={email}
                required={username ? false : true}
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                // helperText={
                //   password != cpassword
                //     ? "Passwords do not match"
                //     : "" || cpassword.length <= 8
                //     ? "Password length should be greater than 8"
                //     : ""
                // }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
          </div>
          {/* <div style={{ display: "flex", flexDirection: "row" }}>
            <BasicTextFields
              fn={setPassword}
              val={password}
              required={true}
              field="Password"
              type="password"
            />
            <BasicTextFields
              fn={setCpassword}
              val={cpassword}
              required={true}
              field="Confirm Password"
              type="password"
            />
            
          </div> */}

          <div
          // style={{ display: "flex", flexDirection: "row" }}
          >
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={password}
                required={true}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                // helperText={
                //   password != cpassword
                //     ? "Passwords do not match"
                //     : "" || cpassword.length <= 8
                //     ? "Password length should be greater than 8"
                //     : ""
                // }
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
          </div>
          <br />
          {/* <Select
          fieldName="Select Your product Category"
          item1="Product Management"
          item2="General Management"
          item3="Digital Transformation"
        /> */}
          {/* <br /> */}
          <BasicButtons text="Login" />
        </form>
        <h4 style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
          <a href="www.google.com">Forgot Password?</a>
        </h4>
        <h4 style={{ fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
          Don't have an account?
          <Link to="/">
            <a href="www.google.com">Sign up</a>
          </Link>
        </h4>

        {/* <br /> */}
      </div>
    </div>
  );
};
const App = () => {
  return (
    // <div>
    //   <RegPage />
    //   <LoginPage/>
    // </div>
    <div>
      <Router>
        {/* <YourComponent/> */}
        <Routes>
          <Route exact path="/" element={<RegPage />} />
          <Route exact path="/Login" element={<LoginPage />} />
          {/* <Route
            exact
            path="/map"
            Component={() => {
              window.location.href = "https://www.mappls.com";
              return null;
            }}
          /> */}
        </Routes>
      </Router>
    </div>
  );
};
export default App;
