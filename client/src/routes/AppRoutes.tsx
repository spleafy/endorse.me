import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Center, Main } from "@prismane/core";
// Pages
// Routes
// Components
// Utils
import { authToken } from "../utils/api";
import { updateUserData } from "../utils/user";

const AppRoutes = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const loggedUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const effect = async () => {
      const response = await authToken();

      if (response.status !== 200) {
        navigate("/auth");
      } else {
        await updateUserData();
      }

      setLoading(false);
    };

    effect();
  });

  return (
    <>
      {loading ? (
        <Center w="100vw" h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to={"home"} />} />
            <Route path="home" element={<h1>Home</h1>} />
          </Routes>
        </Main>
      )}
    </>
  );
};

export default AppRoutes;
