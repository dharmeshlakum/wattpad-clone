import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigator from "./navigator/Navigator";

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Navigator />
      </Router>
    </>
  )
}

export default App;