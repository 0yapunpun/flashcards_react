import React, { useState, useEffect } from "react";

import Header from "./Header";
import Body from "./Body";

const config = require("../config");

function App() {
  const [state, setState] = useState({
    decks: [],

  });

  const getDataDecks = async () => {
    try {
      let rawResponse = await fetch(config.service + "/deck/get");
      let response = await rawResponse.json();

      setState({
        ...state,
        decks: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDecks()
  }, []);

  return (
    <div className="grid-wrapper sidebar-bg bg1">
      <Header />

      <Body state={state} getDataDecks={getDataDecks}/>

    </div>
  );
}

export default App;
