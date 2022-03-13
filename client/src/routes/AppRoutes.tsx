import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Pages
// Routes
// Components
import Loading from "../components/Loading";
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

  const colors = require("tailwindcss/colors");

  useEffect(() => {
    if (loggedUser && loggedUser.settings) {
      Object.keys(colors[loggedUser.settings.themeColor]).forEach(
        (shade: string) => {
          document.documentElement.style.setProperty(
            `--theme-color-${shade}`,
            colors[loggedUser.settings.themeColor][shade]
          );
        }
      );

      loggedUser.settings.darkTheme
        ? document.querySelector("html")?.classList.add("dark")
        : document.querySelector("html")?.classList.remove("dark");
    }
  }, [loggedUser, colors]);

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center fixed">
          <Loading />
        </div>
      ) : (
        <>
          <main>
            <Routes>
              <Route path="/" element={<Navigate to={"home"} />} />
              <Route path="home" element={<h1>Home</h1>} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
};

export default AppRoutes;
