import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// Components
import Card from "../components/Card";
import Form from "../components/Form";
import FormField from "../components/FormField";
import SelectFormField from "../components/SelectFormField";
import PrimaryButton from "../components/PrimaryButton";
// Utils
import { submitForm } from "../utils/form";
import {
  validateRequired,
  validateMin,
  validateEmailRegex,
  validateEmailBackend,
} from "../utils/validators";

const RegisterPage = () => {
  document.title = `Register / ${process.env.REACT_APP_TITLE}`;

  const navigate = useNavigate();

  const [influencer, setInfluencer] = useState(true);

  const submitInfluencer = async (values: any) => {
    const response = await submitForm(values, "auth/register/influencer");
    if (response.status !== 200) {
      setError("password", {
        type: "manual",
        message: "An error occured!",
      });
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

  const submitBussiness = async (values: any) => {
    const response = await submitForm(values, "auth/register/business");
    if (response.status !== 200) {
      setError("password", {
        type: "manual",
        message: "An error occured!",
      });
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card width="480px" heading="Happy to see you!">
        <div className="flex justify-between items-center mb-8 relative py-3 select-none text-slate-500">
          <div
            className={`w-full flex justify-center items-center cursor-pointer ${
              influencer ? "text-primary-500" : ""
            }`}
            onClick={() => {
              setInfluencer(true);
            }}
          >
            Influencer
          </div>
          <div
            className={`w-full flex justify-center items-center cursor-pointer ${
              !influencer ? "text-primary-500" : ""
            }`}
            onClick={() => {
              setInfluencer(false);
            }}
          >
            Business
          </div>
          <div
            className={`absolute h-[2px] w-1/2 bg-primary-500 bottom-0 rounded-full transition-all right-[176px] ${
              !influencer ? "!right-[0px]" : ""
            }`}
          ></div>
        </div>
        <>
          {influencer ? (
            <Form submit={handleSubmit(submitInfluencer)}>
              <FormField
                name="influencerfullname"
                placeholder="Enter name:"
                label="Full Name:"
                type="text"
                register={register}
                error={errors.influencerfullname}
                validators={{
                  required: (v: any) => validateRequired(v),
                }}
              />
              <FormField
                name="influenceremail"
                placeholder="Enter email:"
                label="Email:"
                type="text"
                register={register}
                error={errors.influenceremail}
                validators={{
                  required: (v: any) => validateRequired(v),
                  regex: (v: any) => validateEmailRegex(v),
                  backend: async (v: any) =>
                    await validateEmailBackend(v, false),
                }}
              />
              <FormField
                name="influencerpassword"
                placeholder="Enter password:"
                label="Password:"
                type="password"
                register={register}
                error={errors.influencerpassword}
                validators={{
                  required: (v: any) => validateRequired(v),
                  email: (v: any) => validateMin(v, 8, "Password"),
                }}
              />
              <span className="block w-full text-slate-400 pb-6 text-sm">
                By registering, you agree to our&nbsp;
                <Link to={"/"} className="text-primary-500 hover:underline">
                  Terms & Conditions
                </Link>
                &nbsp;and&nbsp;
                <Link to={"/"} className="text-primary-500 hover:underline">
                  Privacy Policy
                </Link>
              </span>
              <PrimaryButton submit={true}>Register</PrimaryButton>
              <span className="block w-full text-center text-slate-400 pt-6 text-sm">
                Already have an account?&nbsp;
                <Link
                  to={"/auth/login"}
                  className="text-primary-500 hover:underline"
                >
                  Login Now
                </Link>
              </span>
            </Form>
          ) : (
            <Form submit={handleSubmit(submitBussiness)}>
              <FormField
                name="businessname"
                placeholder="Enter business name:"
                label="Business name:"
                type="text"
                register={register}
                error={errors.businessname}
                validators={{
                  required: (v: any) => validateRequired(v),
                }}
              />
              <FormField
                name="businessemail"
                placeholder="Enter business email:"
                label="Business email:"
                type="text"
                register={register}
                error={errors.businessemail}
                validators={{
                  required: (v: any) => validateRequired(v),
                  regex: (v: any) => validateEmailRegex(v),
                  backend: async (v: any) =>
                    await validateEmailBackend(v, false),
                }}
              />
              <FormField
                name="businesspassword"
                placeholder="Enter password:"
                label="Password:"
                type="password"
                register={register}
                error={errors.businesspassword}
                validators={{
                  required: (v: any) => validateRequired(v),
                  password: (v: any) => validateMin(v, 8, "Password"),
                }}
              />
              <div className="flex flex-col">
                <span className="mb-2 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100">
                  Country / Identity number:
                </span>
                <div className="flex gap-[10px]">
                  <div className="w-[150px]">
                    <SelectFormField
                      name="businesscountry"
                      placeholder="Country:"
                      label=""
                      register={register}
                      error={errors.businesscountry}
                      validators={{
                        required: (v: any) => validateRequired(v),
                      }}
                      options={["bg", "us", "uk", "ru"]}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  </div>
                  <FormField
                    name="businessidentitynumber"
                    placeholder="Enter identity number:"
                    label=""
                    type="text"
                    register={register}
                    error={errors.businessidentitynumber}
                    validators={{
                      required: (v: any) => validateRequired(v),
                    }}
                  />
                </div>
              </div>

              <span className="block w-full text-slate-400 pb-6 text-sm">
                By registering, you agree to our&nbsp;
                <Link to={"/"} className="text-primary-500 hover:underline">
                  Terms & Conditions
                </Link>
                &nbsp;and&nbsp;
                <Link to={"/"} className="text-primary-500 hover:underline">
                  Privacy Policy
                </Link>
              </span>
              <PrimaryButton submit={true}>Register</PrimaryButton>
              <span className="block w-full text-center text-slate-400 pt-6 text-sm">
                Already have an account?&nbsp;
                <Link
                  to={"/auth/login"}
                  className="text-primary-500 hover:underline"
                >
                  Login Now
                </Link>
              </span>
            </Form>
          )}
        </>
      </Card>
    </div>
  );
};

export default RegisterPage;
