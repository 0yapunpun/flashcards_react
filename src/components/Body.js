import React, { useState, useEffect } from "react";

import Deck from "./Deck";
import Sidebar from "./Sidebar";
import ModalNewDeck from "./modals/NewDeck";
import ModalEditDeck from "./modals/EditDeck";
import ModalNewCard from "./modals/NewCard";
import ModalEditCard from "./modals/EditCard";
import ModalCardsList from "./modals/CardsList";
import ModalViewCard from "./modals/ViewCard";

const config = require("../config");

function Body({ state, getDataDecks }) {
  const [stateBody, setStateBody] = useState({
    currentDeck: null,
    currentCard: null,
    isVisibleModalNewDeck: false,
    isVisibleModalEditDeck: false,
    isVisibleModalNewCard: false,
    isVisibleModalCardsList: false,
    isVisibleModalEditCard: false,
    isVisibleViewCard: false,
  });

  const setCurrentDeck = (id) => {
    let decks = state.decks;
    let currentDeck = decks.find((o) => o._id == id);

    setStateBody({
      ...stateBody,
      currentDeck: currentDeck,
    });
  };

  const updateCurrentDeck = async (showCardListModal) => {
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
        if (showCardListModal) {
          return setStateBody({
            ...stateBody,
            currentDeck: response.data[0],
            isVisibleModalNewCard: false,
            isVisibleModalEditDeck: false,
            isVisibleModalEditCard: false,
            isVisibleModalCardsList: true,
          });
        }

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

  const showModalNewDeck = (newState) => {
    setStateBody({
      ...stateBody,
      isVisibleModalNewDeck: newState,
    });
  };

  const showModalEditDeck = (newState) => {
    console.log("here", newState);
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

  const showModalCardsList = (newState) => {
    setStateBody({
      ...stateBody,
      isVisibleModalCardsList: newState,
    });
  };

  const showModalCardView = (newState) => {
    setStateBody({
      ...stateBody,
      isVisibleViewCard: newState,
    });
  };

  const toggleModalEdit = (newState, currentCard) => {
    if (currentCard == null) {
      console.log("here?");
      return setStateBody({
        ...stateBody,
        isVisibleModalEditCard: newState,
        isVisibleModalCardsList: !newState,
      });
    }

    setStateBody({
      ...stateBody,
      isVisibleModalEditCard: newState,
      isVisibleModalCardsList: !newState,
      currentCard: currentCard,
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
              <h5>Select a Deck</h5>
            </div>
          ) : (
            <Deck
              currentDeck={stateBody.currentDeck}
              currentName={stateBody.currentName}
              getDataDecks={getDataDecks}
              showModalEditDeck={showModalEditDeck}
              showModalNewCard={showModalNewCard}
              showModalCardsList={showModalCardsList}
              showModalCardView={showModalCardView}
            />
          )}
        </div>
      </div>

      {stateBody.isVisibleModalNewDeck ? (
        <ModalNewDeck
          isVisibleModal={stateBody.isVisibleModalNewDeck}
          showModal={showModalNewDeck}
          getDataDecks={getDataDecks}
        />
      ) : null}

      {stateBody.isVisibleModalEditDeck ? (
        <ModalEditDeck
          isVisibleModal={stateBody.isVisibleModalEditDeck}
          showModal={showModalEditDeck}
          getDataDecks={getDataDecks}
          currentDeck={stateBody.currentDeck}
          updateCurrentDeck={updateCurrentDeck}
        />
      ) : null}

      {stateBody.isVisibleModalNewCard ? (
        <ModalNewCard
          isVisibleModal={stateBody.isVisibleModalNewCard}
          showModal={showModalNewCard}
          currentDeck={stateBody.currentDeck}
          updateCurrentDeck={updateCurrentDeck}
        />
      ) : null}

      {stateBody.isVisibleModalCardsList ? (
        <ModalCardsList
          isVisibleModal={stateBody.isVisibleModalCardsList}
          showModal={showModalCardsList}
          showModalEdit={toggleModalEdit}
          currentDeck={stateBody.currentDeck}
          updateCurrentDeck={updateCurrentDeck}
        />
      ) : null}

      {stateBody.isVisibleModalEditCard ? (
        <ModalEditCard
          isVisibleModal={stateBody.isVisibleModalEditCard}
          showModalList={toggleModalEdit}
          currentCard={stateBody.currentCard}
          currentDeck={stateBody.currentDeck}
          updateCurrentDeck={updateCurrentDeck}
        />
      ) : null}

      {stateBody.isVisibleViewCard ? (
        <ModalViewCard
          isVisibleModal={stateBody.isVisibleViewCard}
          showModal={showModalCardView}
          currentCard={stateBody.currentCard}
          currentDeck={stateBody.currentDeck}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Body;
