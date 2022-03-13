import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Components
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
// Pages

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"app"} />} />
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="app/*" element={<AppRoutes />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
