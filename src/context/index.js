import React, { createContext } from "react";

import { ToastContainer, toast } from "react-toastify";

const AppContext = createContext();

class AppProvider extends React.Component {
  state = {
    stage: 1,
    players: [],
    result: "",
  };

  addPlayerHandler = (name) => {
    this.setState((prevState) => ({
      ...prevState,
      players: [...prevState.players, name],
    }));
  };

  removePlayerHandler = (index) => {
    this.setState((prevState) => {
      prevState.players.splice(index, 1);
      return {
        ...prevState,
        players: prevState.players,
      };
    });
  };

  nextHandler = () => {
    const { players } = this.state;
    if (players.length > 2) {
      this.setState(
        (prevState) => ({
          ...prevState,
          stage: 2,
        }),
        () => {
          setTimeout(this.generateLooser, 2000);
        }
      );
    } else {
      toast.error("You need to have more than one player for this action!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }
  };

  generateLooser = () => {
    this.setState((prevState) => ({
      ...prevState,
      result:
        prevState.players[Math.floor(Math.random() * prevState.players.length)],
    }));
  };

  resetHandler = () => {
    this.setState({
      stage: 1,
      players: [],
      result: "",
    });
  };

  render() {
    return (
      <>
        <ToastContainer />
        <AppContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayerHandler,
            removePlayer: this.removePlayerHandler,
            next: this.nextHandler,
            looser: this.generateLooser,
            reset: this.resetHandler,
          }}
        >
          {this.props.children}
        </AppContext.Provider>
      </>
    );
  }
}

export { AppContext, AppProvider };
