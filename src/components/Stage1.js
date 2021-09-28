import React, { useRef, useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";

import { AppContext } from "./../context";

const Stage1 = () => {
  const [error, setError] = useState([false, ""]);
  const inputRef = useRef(null);
  const context = useContext(AppContext);

  const handleClick = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (validateInput(value)) {
      setError([false, ""]);
      context.addPlayer(value);
      inputRef.current.value = "";
    }
  };

  const validateInput = (input) => {
    if (input.length === 0) {
      setError([true, "Sorry, Please enter the name."]);
      return false;
    } else if (input.length < 3) {
      setError([true, "Sorry, Please enter atleast 4 chars for name"]);
      return false;
    }
    return true;
  };

  const { players } = context.state;
  return (
    <>
      <Form onSubmit={handleClick}>
        <Form.Group className="mt-4">
          <Form.Control
            name="player"
            ref={inputRef}
            type="text"
            placeholder="Add player name ..."
          />
        </Form.Group>
        {error[0] && (
          <Alert className="mt-2" variant="danger">
            {error[1]}{" "}
          </Alert>
        )}
        <Button variant="primary" className="mt-4" type="submit">
          Add Player
        </Button>
      </Form>
      {players.length > 0 && (
        <div>
          <hr />
          <ul className="list-group">
            {players.map((e, i) => (
              <li key={i} className="list-group-item">
                {e}
                <span
                  className="float-end badge badge-danger"
                  onClick={(e) => context.removePlayer(i)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
          <div className="action_button" onClick={() => context.next()}>
            NEXT
          </div>
        </div>
      )}
    </>
  );
};

export default Stage1;
