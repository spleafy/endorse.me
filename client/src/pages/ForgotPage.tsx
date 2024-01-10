import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  Center,
  Link,
  Flex,
  Text,
  Form,
  TextField,
  fr,
} from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import { required, email } from "@prismane/core/validators";
// Utils
import { submitForm } from "../utils/form";
import { emailBackend } from "../utils/validators";

const ForgotPage = () => {
  document.title = `Forgot / ${process.env.REACT_APP_NAME}`;

  const [sentEmail, setSentEmail] = useState(false);

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/forgot");

    if (response.status === 202) {
      setSentEmail(true);
    }
  };

  const { register, handleSubmit } = useForm({
    fields: {
      email: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          regex: (v: any) => email(v),
          backend: async (v: any) => await emailBackend(v, true),
        },
      },
    },
  });

  return (
    <Center w="100vw" h="100vh">
      {!sentEmail ? (
        <Card w="480px">
          <Card.Header justify="center" mb={fr(4)}>
            <Text as="h1">Hope we can help!</Text>
          </Card.Header>

          <Form onSubmit={(e: SubmitEvent) => handleSubmit(e, submit)}>
            <TextField
              placeholder="Enter email:"
              label="Email:"
              {...register("email")}
            />

            <Button type="submit" full>
              Send Link
            </Button>
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
          <Text as="h1">We sent you an email!</Text>
          <Text as="h2" fs="md" mb={fr(8)} mt={fr(3)} cl={["base", 700]}>
            If you don't find the email, check the junk folder!
          </Text>
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

export default ForgotPage;
