import { Toaster } from "react-hot-toast";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <>
      <MainRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
