import React from "react";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";
import { useAuth } from "./hooks/use-auth-listener";
import { useProfile } from "./hooks/use-profile-listener";
import Router from "./routes";

const App = () => {
  const { loading } = useProfile();
  const { user } = useAuth();

  if (user && loading) return <Loader />;
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
