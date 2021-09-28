import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";

import { AppContext } from "./context";

class App extends React.Component {
  static contextType = AppContext;

  render() {
    const { stage } = this.context.state;
    return (
      <div className="wrapper">
        <div className="center-wrapper">
          <h1>Who pays the bill?</h1>
          {stage === 1 ? <Stage1 /> : <Stage2 />}
        </div>
      </div>
    );
  }
}

export default App;
