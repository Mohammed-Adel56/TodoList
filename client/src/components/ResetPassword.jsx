import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const { id, token } = useParams();
  const onSubmit = async (form) => {
    const { password } = form;

    const { data } = await axios.post("/resetPassword", {
      id: id,
      newPassword: password,
      token: token,
    });
    if (data.error) {
      toast.error(data.error);
    }
    toast.success(data.message);
    nav("/login");

    // console.log(data);
  };
  return (
    <div className="container-fluid ">
      <div className="row justify-content-center align-content-center p-5">
        <div className="col-12 col-md-6 ">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send New Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
