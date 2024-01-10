import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Center,
  Button,
  Card,
  Text,
  Link,
  Flex,
  Form,
  TextField,
  PasswordField,
  fr,
} from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import { required, min, email } from "@prismane/core/validators";
// Utils
import { submitForm } from "../utils/form";
import { emailBackend } from "../utils/validators";

const LoginPage = () => {
  document.title = `Login / ${process.env.REACT_APP_NAME}`;

  const navigate = useNavigate();

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/login");
    if (response.status !== 200) {
      setError("password", "This password is invalid for this email!");
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

  const { register, handleSubmit, setError } = useForm({
    fields: {
      email: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          min: (v: any) => min(v, 4, "Email"),
          regex: (v: any) => email(v),
          backend: async (v: any) => await emailBackend(v, true),
        },
      },
      password: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          min: (v: any) => min(v, 8, "Password"),
        },
      },
    },
  });

  return (
    <Center w="100vw" h="100vh">
      <Card w="480px">
        <Card.Header justify="center" mb={fr(4)}>
          <Text as="h1">Happy to see you!</Text>
        </Card.Header>
        <Form onSubmit={(e: SubmitEvent) => handleSubmit(e, submit)}>
          <TextField
            placeholder="Enter email:"
            label="Email:"
            {...register("email")}
          />
          <PasswordField
            placeholder="Enter password:"
            label="Password:"
            {...register("password")}
          />
          <Link
            as={RouterLink}
            cl="primary"
            fs="sm"
            mb={fr(6)}
            href=""
            to={"/auth/forgot"}
          >
            Forgot Password?
          </Link>
          <Button type="submit" full>
            Login
          </Button>
          <Flex align="center" justify="center" fs="sm" pt={fr(6)}>
            <Text cl={["base", 400]} ta="center">
              Don't have an account?&nbsp;
            </Text>
            <Link as={RouterLink} cl="primary" href="" to={"/auth/register"}>
              Register Now
            </Link>
          </Flex>
        </Form>
      </Card>
    </Center>
  );
};

export default LoginPage;
