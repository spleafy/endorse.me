import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Text,
  Center,
  Flex,
  Link,
  Form,
  TextField,
  PasswordField,
  fr,
  Box,
} from "@prismane/core";
import { useForm } from "@prismane/core/hooks";
import { required, min, email } from "@prismane/core/validators";
import { motion } from "framer-motion";
// Utils
import { submitForm } from "../utils/form";
import { emailBackend } from "../utils/validators";

const BottomForm = () => (
  <>
    <Text pb={fr(6)} cl={["base", 400]} fs="sm">
      By registering, you agree to our&nbsp;
      <Link as={RouterLink} dp="inline-block" cl="primary" href="" to={"/"}>
        Terms & Conditions
      </Link>
      &nbsp;and&nbsp;
      <Link as={RouterLink} dp="inline-block" cl="primary" href="" to={"/"}>
        Privacy Policy
      </Link>
    </Text>
    <Button type="submit" full>
      Register
    </Button>
    <Flex align="center" justify="center" fs="sm" pt={fr(6)}>
      <Text cl={["base", 400]} ta="center">
        Already have an account?&nbsp;
      </Text>
      <Link as={RouterLink} cl="primary" href="" to={"/auth/login"}>
        Login
      </Link>
    </Flex>
  </>
);

const RegisterPage = () => {
  document.title = `Register / ${process.env.REACT_APP_NAME}`;

  const navigate = useNavigate();

  const [influencer, setInfluencer] = useState(true);

  const submitInfluencer = async (values: any) => {
    const response = await submitForm(values, "auth/register/influencer");
    if (response.status !== 200) {
      setError("password", "An error occured!");
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

  const submitBussiness = async (values: any) => {
    const response = await submitForm(values, "auth/register/business");
    if (response.status !== 200) {
      setError("password", "An error occured!");
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

  const { register, handleSubmit, setError } = useForm({
    fields: {
      influencer_fullname: {
        value: "",
        validators: {
          required: (v: any) => required(v),
        },
      },
      influencer_email: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          regex: (v: any) => email(v),
          backend: async (v: any) => await emailBackend(v, false),
        },
      },
      influencer_password: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          email: (v: any) => min(v, 8, "Password"),
        },
      },
      business_name: {
        value: "",
        validators: {
          required: (v: any) => required(v),
        },
      },
      business_email: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          regex: (v: any) => email(v),
          backend: async (v: any) => await emailBackend(v, false),
        },
      },
      business_password: {
        value: "",
        validators: {
          required: (v: any) => required(v),
          password: (v: any) => min(v, 8, "Password"),
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
        <Flex
          justify="between"
          align="center"
          mb={fr(8)}
          py={fr(3)}
          pos="relative"
          cl="base"
        >
          <Flex
            w="100%"
            justify="center"
            align="center"
            cs="pointer"
            cl={influencer ? "primary" : undefined}
            onClick={() => {
              setInfluencer(true);
            }}
          >
            Influencer
          </Flex>
          <Flex
            w="100%"
            justify="center"
            align="center"
            cs="pointer"
            cl={!influencer ? "primary" : undefined}
            onClick={() => {
              setInfluencer(false);
            }}
          >
            Business
          </Flex>
          <Flex
            h={2}
            w="100%"
            b={0}
            pos="absolute"
            justify={!influencer ? "end" : "start"}
          >
            <Box
              as={motion.div}
              layout
              h="100%"
              w="50%"
              bg="primary"
              br="full"
            ></Box>
          </Flex>
        </Flex>
        <>
          {influencer ? (
            <Form
              onSubmit={(e: SubmitEvent) => handleSubmit(e, submitInfluencer)}
            >
              <TextField
                name="influencerfullname"
                placeholder="Enter name:"
                label="Full Name:"
                {...register("influencer_fullname")}
              />
              <TextField
                placeholder="Enter email:"
                label="Email:"
                type="text"
                {...register("influencer_email")}
              />
              <PasswordField
                placeholder="Enter password:"
                label="Password:"
                {...register("influencer_password")}
              />
              <BottomForm />
            </Form>
          ) : (
            <Form
              onSubmit={(e: SubmitEvent) => handleSubmit(e, submitBussiness)}
            >
              <TextField
                placeholder="Enter business name:"
                label="Business name:"
                {...register("business_name")}
              />
              <TextField
                name="businessemail"
                placeholder="Enter business email:"
                label="Business email:"
                {...register("business_email")}
              />
              <PasswordField
                placeholder="Enter password:"
                label="Password:"
                {...register("business_password")}
              />
              <BottomForm />
            </Form>
          )}
        </>
      </Card>
    </Center>
  );
};

export default RegisterPage;
