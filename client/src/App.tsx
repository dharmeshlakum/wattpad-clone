import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigator from "./navigator/Navigator";
import AuthFormProvider from "./context/formContext/AuthFormProvider";

const App: React.FC = () => {

  return (
    <>
      <Router>
        <AuthFormProvider>
          <Navigator />
        </AuthFormProvider>
      </Router>
    </>
  )
}

export default App;