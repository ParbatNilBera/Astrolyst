import { Toaster } from "react-hot-toast";
import MainRoutes from "./routes/MainRoutes";
import UserProvider from "./Context/UserContext";

const App = () => {
  return (
    <>
      <UserProvider>
        <MainRoutes />
        <Toaster position="top-right" reverseOrder={false} />
      </UserProvider>
    </>
  );
};

export default App;
