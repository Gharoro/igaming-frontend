import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import TopBar from "./components/TopBar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthRoute from "./components/AuthRoute";
import {
  GamePlay,
  Home,
  Landing,
  Login,
  Register,
  Result,
} from "./routes/routes";

function App() {
  return (
    <>
      <TopBar />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />

          {/* Auth Routes (Login, Register) */}
          <Route element={<AuthRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/game/:id/play" element={<GamePlay />} />
            <Route path="/game/:id/result" element={<Result />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
