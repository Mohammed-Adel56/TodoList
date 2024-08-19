import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import UserAuth from "../Context/Auth";
const ForgetPassword = () => {
  const { register, handleSubmit } = useForm();
  //   const { login } = useContext(UserAuth);

  const onSubmit = async (form) => {
    const { email } = form;
    const { data } = await axios.post("/forgetPassword", { email });
    if (data.error) {
      toast.error(data.error);
    }
    toast.success(data.message);

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
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
