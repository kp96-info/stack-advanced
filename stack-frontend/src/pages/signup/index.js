import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../shared/functions";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [variant, setVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const response = await api(
      "POST",
      "http://127.0.0.1:8000/api/signup",
      formData
    )
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          setShowAlert(true);
          setVariant("success");
          setMessage("You have successfully signed up");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        setShowAlert(true);
        setVariant("danger");
        setMessage(err.message);
      });
  };
  return (
    <div className={"form-container"}>
      <div className={"auth-form"}>
        <h3> Sign Up</h3>
        <span className="float-end">
          <Link to="/"> Go to Home </Link>
        </span>
        <Form onSubmit={(e) => submit(e)}>
          <Form.Group className="mb-3" controlId="formGroupusername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </Form.Group>
          <button type="submit" className="mt-2 btn btn-primary">
            Sign Up
          </button>
          <span className="float-end">
            Already have a account ?<Link to="/login"> Login here </Link>
          </span>
          {showAlert && (
            <Alert key={"aler"} variant={variant}>
              {message}
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
}
