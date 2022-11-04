
import React, { useState, useEffect } from "react";

import Deck from "./Deck";
import Sidebar from "./Sidebar";
import ModalNewDeck from "./modals/NewDeck";
import ModalEditDeck from "./modals/EditDeck";
import ModalNewCard from "./modals/NewCard";

const config = require("../config");

function Body({state, getDataDecks}) {
  const [stateBody, setStateBody] = useState({
    currentDeck: null,
    isVisibleModalNewDeck: false,
    isVisibleModalEditDeck: false,
    isVisibleModalNewCard: false,
  });

  const setCurrentDeck = (id) => {
    let decks = state.decks;
    let currentDeck = decks.find((o) => o._id == id);

    setStateBody({
      ...stateBody,
      currentDeck: currentDeck,
    });
  };

  const updateCurrentDeck = async() => {
    try {
      const RawResponse = await fetch(config.service + "/deck/getDeck", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: stateBody.currentDeck._id,
        }),
      });
      const response = await RawResponse.json();

      if (response.success) {
        setStateBody({
          ...stateBody,
          currentDeck: response.data[0],
          isVisibleModalNewCard: false,
          isVisibleModalEditDeck: false,
        });
      }

    } catch (error) {
      console.log(error);
    }

  };

  const setCurrentName = (newName) => {
    setStateBody({
      ...stateBody,
      currentName: newName,
      isVisibleModalEditDeck: false,
    });
  };

  const showModalNewDeck = (newState) => {
    setStateBody({
      ...stateBody,
      isVisibleModalNewDeck: newState,
    });
  };

  const showModalEditDeck = (newState) => {
    setStateBody({
      ...stateBody,
      isVisibleModalEditDeck: newState,
    });
  };

  const showModalNewCard = (newState) => {
    setStateBody({
      ...stateBody,
      isVisibleModalNewCard: newState,
    });
  };


  return (
    <React.Fragment>
      <Sidebar
        decks={state.decks}
        showModal={showModalNewDeck}
        setCurrentDeck={setCurrentDeck}
      />

      <div className="main">
        <div className="w-100 d-flex justify-content-center ">
          {stateBody.currentDeck == null ? (
            <div id="messageSelectDeck" className="mt-5 mb-5">
              <h5>Seleccione algún mazo</h5>
            </div>
          ) : (
            <Deck 
              currentDeck={stateBody.currentDeck} 
              currentName={stateBody.currentName}
              getDataDecks={getDataDecks} 
              showModalEditDeck={showModalEditDeck}
              showModalNewCard={showModalNewCard}
            />
          )}
        </div>
      </div>

      <ModalNewDeck
        isVisibleModal={stateBody.isVisibleModalNewDeck}
        showModal={showModalNewDeck}
        getDataDecks={getDataDecks}
      />

      <ModalEditDeck
        isVisibleModal={stateBody.isVisibleModalEditDeck}
        showModal={showModalEditDeck}
        getDataDecks={getDataDecks}
        currentDeck={stateBody.currentDeck}
        updateCurrentDeck={updateCurrentDeck}
      />

      <ModalNewCard
        isVisibleModal={stateBody.isVisibleModalNewCard}
        showModal={showModalNewCard}
        currentDeck={stateBody.currentDeck}
        updateCurrentDeck={updateCurrentDeck}
      />


    </React.Fragment>
  );
}

export default Body;
