import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigator from "./navigator/Navigator";
import AuthFormProvider from "./context/formContext/AuthFormProvider";
import AuthProviders from "./context/authContext/AuthProviders";

const App: React.FC = () => {

  return (
    <>
      <Router>
        <AuthFormProvider>
          <AuthProviders>
            <Navigator />
          </AuthProviders>
        </AuthFormProvider>
      </Router>
    </>
  )
}

export default App;