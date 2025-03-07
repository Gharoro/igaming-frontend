import { RouterProvider } from "react-router";
import router from "./routes/routes";
import TopBar from "./components/TopBar";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <TopBar />
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </>
  );
}

export default App;