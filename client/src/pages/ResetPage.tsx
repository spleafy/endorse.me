import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
  validateMatchBoth,
} from "../utils/validators";

const ResetPage = () => {
  document.title = `Reset / ${process.env.REACT_APP_TITLE}`;

  const navigate = useNavigate();

  const [params] = useSearchParams();

  const token = params.get("token");

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/reset", token);

    if (response.status !== 200) {
      setError("repassword", {
        type: "manual",
        message: "An error occured! Try again in a second!",
      });
    } else {
      navigate("/auth/login");
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card width="480px" heading="Reset Password">
        {token ? (
          <Form submit={handleSubmit(submit)}>
            <FormField
              name="password"
              placeholder="Enter new password:"
              label="New password:"
              type="password"
              register={register}
              error={errors.password}
              validators={{
                required: (v: any) => validateRequired(v),
                min: (v: any) => validateMin(v, 8, "Password"),
              }}
            />

            <FormField
              name="repassword"
              placeholder="Retype new password:"
              label="Retype new password:"
              type="password"
              register={register}
              error={errors.repassword}
              validators={{
                required: (v: any) => validateRequired(v),
                min: (v: any) => validateMin(v, 8, "Password"),
                match: (v: any) =>
                  validateMatchBoth(v, getValues("password"), "Passwords"),
              }}
            />

            <PrimaryButton submit={true}>Reset Password</PrimaryButton>
            <span className="block w-full text-center text-slate-400 pt-6 text-sm">
              Remembered your password?&nbsp;
              <Link
                to={"/auth/login"}
                className="text-primary-500 hover:underline"
              >
                Login Now
              </Link>
            </span>
          </Form>
        ) : (
          <div className="text-center shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] w-[480px] min-w-[480px] rounded-md px-16 py-8 animate-scale bg-white select-none">
            <h1>We didn't detect the reset token!</h1>
            <span className="block w-full text-slate-400 pt-6 text-sm">
              Go back to login?&nbsp;
              <Link
                to={"/auth/login"}
                className="text-primary-500 hover:underline"
              >
                Login Now
              </Link>
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResetPage;
