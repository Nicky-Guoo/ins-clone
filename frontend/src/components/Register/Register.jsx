import { useState } from "react";
import {
  Container,
  Logo,
  Form,
  Input,
  Button,
  SignUpLink,
  ErrorMessage,
} from "./Register.style";
import instagram from "../../assets/images/ins.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  // error state
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e, key) => {
    let obj = { ...formData, [key]: e.target.value }; // update the key with new value
    setFormData(obj);
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    // check if all fields are filled
    const unFilledFields = Object.keys(formData).filter(
      (key) => !formData[key]
    );
    if (unFilledFields.length) {
      setError(`${unFilledFields.join(", ")} cannot be empty`);
      return;
    }
    // if all fields are filled
    try {
      const url = "http://localhost:8000/api/auth/register";
      // send form data to the server
      const response = await axios.post(url, formData);
      // get response data
      console.log(response.data);
      // clear form data
      setFormData({ fullName: "", email: "", username: "", password: "" });
      navigate("/home");
    } catch (error) {
      console.error("Error registering user", error.response.data);
      setError(error.response.data.message);
    }
  };
  return (
    <Container>
      <Logo src={instagram} alt="Instagram" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          // handle input change
          onChange={(e) => handleChange(e, "fullName")}
        />

        <Input
          type="text"
          placeholder="Email or Mobile Number"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
        />

        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleChange(e, "username")}
        />

        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
        />

        <Button type="submit">Sign Up</Button>
      </Form>
      {/* show error message if any */}
      {error && <ErrorMessage>{error} </ErrorMessage>}
      <SignUpLink>
        Already have an account?
        <Link to="/login">Log In</Link>`
      </SignUpLink>
    </Container>
  );
};

export default Register;
