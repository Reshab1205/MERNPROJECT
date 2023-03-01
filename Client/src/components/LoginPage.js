import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const Loginpage = () => {
  const email = useRef();
  const otp = useRef();
  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [loginuser, setloginuser] = useState({
    email: "",
    otp: "",
  });
  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;

    let copy = { ...loginuser, [name]: value };
    // console.log(copy);
    setloginuser(copy);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(loginuser)
    setError(err);
    console.log(err, "=============err");
    if (err && Object.keys(err).length === 0) {
      login();
    }
  };
  
  const validate = (values) => {
    let err = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      err.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      err.email = "This is not a valid email format!";
    }
    if (!values.otp) {
      err.otp = "otp is required";
    } else if (values.otp.length < 4) {
      err.otp = "otp must be more than 4 characters";
    } else if (values.otp.length > 4) {
      err.otp = "otp cannot exceed more than 4 characters";
    }
    return err;
  };
  
  
  
  const login = async () => {
    const { email, otp } = loginuser;
    
    try {
      const data = await axios.post("http://localhost:3001/user/userLogin", { email, otp });
      
      console.log("data>>", data);
      
    
      const token = data.data.token_session;
      const userId=data.data.user_id;
      const userProfileName = data.data.username;
      console.log(userProfileName);
      console.log(token);

      
      // document.cookie = token;
      if (data.data.error) {
        console.log(data.data.message);
        alert(data.data.message);
      } else {
        console.log(token);
        localStorage.clear()
        localStorage.setItem("isAuthenticated",  JSON.stringify(token));
        localStorage.setItem("userId",  JSON.stringify(userId));
        localStorage.setItem("userProfileName",  JSON.stringify(userProfileName));
        alert(data.data.message);
        navigate("/post");
      }
    } catch (err) {
      // console.log(err);
    }
  };


  useEffect(() => {
    // login();
  }, []);

  return (
    <div>
      <Navigationbar />

      <Card className="formcard p-5">
        <Form method="POST">
          <h4>Login Here!</h4>
          <Card.Body>
            <FloatingLabel
              // controlId="floatingInput"
              label={<FaEnvelope />}
              className="mt-5 mb-4"
            >
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter Email"
                ref={email}
                title={"email"}

              />
              <span style={{ color: "red" }}>{error.email}</span>
            </FloatingLabel>

            <FloatingLabel
              // controlId="floatingInput"
              label={<FaLock />}
              className="mb-4"
            >
              <Form.Control
                name="otp"
                onChange={handleChange}
                type="otp"
                placeholder="enter otp"
                ref={otp}
              />
              <span style={{ color: "red" }}>{error.otp}</span>
            </FloatingLabel>

            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                onClick={handleSubmit}
                title="loginBtn"

              >
                {" "}
                Log In{" "}
              </Button>
            </div>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
};

export default Loginpage;
