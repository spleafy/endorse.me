import {
  Link as RouterLink,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Center,
  Button,
  Card,
  Text,
  Flex,
  Link,
  Form,
  PasswordField,
  fr,
} from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import { required, min, match } from "@prismane/core/validators";
// Utils
import { submitForm } from "../utils/form";

const ResetPage = () => {
  document.title = `Reset / ${process.env.REACT_APP_NAME}`;

  const navigate = useNavigate();

  const [params] = useSearchParams();

  const token = params.get("token");

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/reset", token);

    if (response.status !== 200) {
      setError("repassword", "An error occured! Try again in a second!");
    } else {
      navigate("/auth/login");
    }
  };

  const { register, handleSubmit, setError, getValue } = useForm({
    fields: {
      password: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          min: (v: any) => min(v, 8, "Password"),
        },
      },
      repassword: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          min: (v: any) => min(v, 8, "Password"),
          match: (v: any) => match(v, getValue("password"), "Passwords"),
        },
      },
    },
  });

  return (
    <Center w="100vw" h="100vh">
      {token ? (
        <Card w="480px">
          <Card.Header justify="center" mb={fr(4)}>
            <Text as="h1">Reset Password</Text>
          </Card.Header>
          <Form onSubmit={(e: SubmitEvent) => handleSubmit(e, submit)}>
            <PasswordField
              name="password"
              placeholder="Enter new password:"
              label="New password:"
              {...register("password")}
            />
            <PasswordField
              name="repassword"
              placeholder="Retype new password:"
              label="Retype new password:"
              {...register("repassword")}
            />
            <Button type="submit">Reset Password</Button>
            <Flex align="center" justify="center" fs="sm" pt={fr(6)}>
              <Text cl={["base", 400]} ta="center">
                Remembered your password?&nbsp;
              </Text>
              <Link as={RouterLink} cl="primary" href="" to={"/auth/login"}>
                Login Now
              </Link>
            </Flex>
          </Form>
        </Card>
      ) : (
        <Card>
          <Text as="h1">We didn't detect the reset token!</Text>
          <Flex align="center" justify="center" fs="sm" pt={fr(6)}>
            <Text cl={["base", 400]} ta="center">
              Go back to login?&nbsp;
            </Text>
            <Link as={RouterLink} cl="primary" href="" to={"/auth/login"}>
              Login Now
            </Link>
          </Flex>
        </Card>
      )}
    </Center>
  );
};

export default ResetPage;
