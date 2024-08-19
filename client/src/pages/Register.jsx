import axios from "axios";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserAuth from "../Context/Auth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserAuth);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (form) => {
    const { name, email, password } = form;
    try {
      const { data } = await axios.post(
        "/register",
        JSON.stringify({
          name,
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
        toast.success("Login Successful ,Welcome !");
        login();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" container-fluid">
      <div className="row justify-content-center align-content-center p-5">
        <div className="col-12 col-md-6  ">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name?.type == "required" && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email?.type == "required" && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <Form.Text className="text-danger">
                  This password is required
                </Form.Text>
              )}
              {errors.password?.type === "minLength" && (
                <Form.Text className="text-danger">
                  Password should be at least 6 characters long
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
