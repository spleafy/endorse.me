import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// Components
import Card from "../components/Card";
import Form from "../components/Form";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
// Utils
import { submitForm } from "../utils/form";
import {
  validateRequired,
  validateMin,
  validateEmailRegex,
  validateEmailBackend,
} from "../utils/validators";

const LoginPage = () => {
  document.title = `Login / ${process.env.REACT_APP_TITLE}`;

  const navigate = useNavigate();

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/login");
    if (response.status !== 200) {
      setError("password", {
        type: "manual",
        message: "This password is invalid for this email!",
      });
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card width="480px" heading="Welcome back!">
        <Form submit={handleSubmit(submit)}>
          <FormField
            name="email"
            placeholder="Enter email:"
            label="Email:"
            type="text"
            register={register}
            error={errors.email}
            validators={{
              required: (v: any) => validateRequired(v),
              min: (v: any) => validateMin(v, 4, "Email"),
              regex: (v: any) => validateEmailRegex(v),
              backend: async (v: any) => await validateEmailBackend(v, true),
            }}
          />
          <FormField
            name="password"
            placeholder="Enter password:"
            label="Password:"
            type="password"
            register={register}
            error={errors.password}
            validators={{
              required: (v: any) => validateRequired(v),
              min: (v: any) => validateMin(v, 8, "Password"),
            }}
            action={
              <Link
                to={"/auth/forgot"}
                className="text-primary-500 hover:underline"
              >
                Forgot Password?
              </Link>
            }
          />
          <PrimaryButton submit={true}>Login</PrimaryButton>
          <span className="block w-full text-center text-slate-400 pt-6 text-sm">
            Don't have an account?&nbsp;
            <Link
              to={"/auth/register"}
              className="text-primary-500 hover:underline"
            >
              Register Now
            </Link>
          </span>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
