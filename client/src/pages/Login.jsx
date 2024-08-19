import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserAuth from "../Context/Auth";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(UserAuth);
  const nav = useNavigate();
  const onSubmit = async (form) => {
    const { email, password } = form;
    try {
      const { data } = await axios.post(
        "/login",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        login();
        nav("/");
      }
    } catch (err) {
      console.log(err);
    }

    // console.log(data);
  };

  return (
    <div className="container-fluid ">
      <div className="row justify-content-center align-content-center p-5">
        <div className="col-12 col-md-6 ">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
