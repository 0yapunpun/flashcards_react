import React, { useState, useEffect } from "react";

const config = require("../../config");

function Modal({ isVisibleModal, showModal, currentDeck }) {
  const [stateview, setStateView] = useState({
    currentCards: [...currentDeck.cards],
    currentCard: currentDeck.cards[0],
    isCardFliped: false,
  });

  const nextCard = () => {
    let currentIndex = stateview.currentCards.findIndex(e => e._id == stateview.currentCard._id);

    setStateView({
      ...stateview,
      currentCard: stateview.currentCards[currentIndex + 1],
    });
  };

  const prevCard = () => {
    let currentIndex = stateview.currentCards.findIndex(e => e._id == stateview.currentCard._id);

    setStateView({
      ...stateview,
      currentCard: stateview.currentCards[currentIndex - 1],
    });
  };

  const flipCard = () => {
    let currentState = stateview.isCardFliped;

    console.log(currentState)

    setStateView({
      ...stateview,
      isCardFliped: !currentState,
    });

    setTimeout(() => {
      setStateView({
        ...stateview,
        isCardFliped: currentState,
      });
    }, 3000);
  };

  const setStateVoted = (state) => {
    let currentCards, currentCard, numericState;


    currentCards = stateview.currentCards.map(card => {
      if (card._id == stateview.currentCard._id) {
        return { ...card, voted: state };
      }
      return card;
    });

    currentCard = currentCards.find(card => card._id == stateview.currentCard._id)

    switch (state) {
      case 'top':
        numericState = +1;
        break;
      case 'down':
        numericState = -0.5;
        break;
      case 'mid':
        numericState = +0.5;
        break;
    }

    setStateCall({
      idDeck: currentDeck._id,
      idCard: stateview.currentCard._id,
      state: numericState
    })

    setStateView({
      ...stateview,
      currentCards: currentCards,
      currentCard: currentCard,
    });
  };

  const setStateCall = async (data) => {
    try {
      const RawResponse = await fetch(config.service + "/deck/card/state", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const response = await RawResponse.json();
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"modal " + (isVisibleModal ? "showModal" : "")}>
      <div
        className="modal-content-custom noBackgrounColor"
        style={{ width: "50%" }}
      >

        <div className="modal-content" style={{ backgroundColor: "transparent" }}>
          <div
            id="animationCard"
            className={
              "card_animation " +
              (stateview.isCardFliped ? "card_is-flipped" : "")
            }
          >
            <div className="card_face card__face--front modal-body d-flex justify-content-center align-items-center">
              <div>

                <div
                  className="text-center"
                  style={{ marginTop: "100px", marginBottom: "50px" }}
                >
                  <h1 id="studyCardFront">
                    {stateview.currentCard != null
                      ? stateview.currentCard.question
                      : null}
                  </h1>
                </div>

                {/* Hands Buttons */}
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "50px", position: "relative", top: "40px" }}
                >
                  <div className="thumbBtn">
                    <span
                      id="downThumbBtn"
                      className={"material-symbols-outlined handBtn cursorPointer noselect " +
                        (stateview.currentCard != null && stateview.currentCard.voted == 'down' ? 'downThumbBtnActive' : stateview.currentCard != null && stateview.hasOwnProperty('voted') ? "inactiveHandsButtons" : null)}
                      onClick={() => setStateVoted('down')}
                    >
                      thumb_down
                    </span>
                  </div>
                  <div className="mx-4 thumbBtn">
                    <span
                      id="upHand"
                      className={"material-symbols-outlined handBtn cursorPointer noselect " +
                        (stateview.currentCard != null && stateview.currentCard.voted == 'mid' ? "upHandActive" : stateview.currentCard != null && stateview.hasOwnProperty('voted') ? "inactiveHandsButtons" : null)}
                      onClick={() => setStateVoted('mid')}
                    >
                      back_hand
                    </span>
                  </div>
                  <div className="thumbBtn">
                    <span
                      id="upThumbBtn"
                      className={"material-symbols-outlined handBtn cursorPointer noselect " +
                        (stateview.currentCard != null && stateview.currentCard.voted == 'top' ? "upThumbBtnActive" : stateview.currentCard != null && stateview.hasOwnProperty('voted') ? "inactiveHandsButtons" : null)}
                      onClick={() => setStateVoted('top')}
                    >
                      thumb_up
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Counter */}
            <div className="card_face card__face--back modal-body d-flex justify-content-center align-items-center">
              <div>
                <div
                  className="text-center"
                  style={{ marginTop: "30px", marginBottom: "50px" }}
                >
                  <h1 id="studyCardBack">
                    {stateview.currentCard != null
                      ? stateview.currentCard.answer
                      : null}
                  </h1>
                </div>
              </div>
            </div>

            {/* Left Button */}
            <div>

              {stateview.currentCards.findIndex(e => e._id == stateview.currentCard._id) != 0 ? (
                <div
                  id="iconLeftModal"
                  className={'iconSideCard cursorPointer ' + (stateview.isCardFliped ? "hideElement" : "")}
                  style={{
                    position: "absolute",
                    left: " -15%",
                    bottom: "40%",
                  }}
                >
                  <span
                    className="material-symbols-outlined iconSideCard noselect hideIcon"
                    style={{ fontSize: "80px" }}
                    onClick={() => prevCard()}
                  >
                    chevron_left
                  </span>
                </div>
              ) : null}

              {/* Right Button */}
              {stateview.currentCards.findIndex(e => e._id == stateview.currentCard._id) !=
                stateview.currentCards.length - 1 ? (
                <div
                  id="iconRightModal"
                  style={{ position: "absolute", right: "-15%", bottom: "40%" }}
                  className={'cursorPointer ' + (stateview.isCardFliped ? "hideElement" : "")}
                >
                  <span
                    className="material-symbols-outlined iconSideCard noselect hideIcon"
                    style={{ fontSize: "80px" }}
                    onClick={() => nextCard()}
                  >
                    chevron_right
                  </span>
                </div>
              ) : null}

              {/* Finish Button */}
              {stateview.currentCards.findIndex(e => e._id == stateview.currentCard._id) ==
                stateview.currentCards.length - 1 ? (
                <div
                  id="btnEndSessionModal"
                  style={{
                    position: "absolute",
                    right: "-15%",
                    bottom: "47%",
                  }}
                >
                  <button
                    id="btnEndSession"
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => showModal(false)}
                  >
                    Finish
                  </button>
                </div>
              ) : null}

            </div>

            {/* Close Button */}
            <div className={(stateview.isCardFliped ? "hideElement" : "")}>
              <div
                id="iconCloseCardModal"
                className="hideIcon cursorPointer"
                style={{ position: "absolute", right: "2%", top: "5%" }}
                onClick={(e) => showModal(false)}
              >
                <span
                  className="material-symbols-outlined iconSideCard noselect"
                  style={{ fontSize: "30px" }}
                >
                  close
                </span>
              </div>
            </div>

            {/* Cards Counter */}
            <div className={(stateview.isCardFliped ? "hideElement" : "")}>
              <div
                id="iconCardCounter"
                className="hideIcon"
                style={{ position: "absolute", left: "3%", top: "5%" }}
              >
                <span id="currentCardCounter">
                  {stateview.currentCards.findIndex(e => e._id == stateview.currentCard._id) + 1}
                </span>
                /<span id="totalCardCounter">{currentDeck.cards.length}</span>
              </div>
            </div>

            <div className={(stateview.isCardFliped ? "hideElement" : "")}>
              <div
                id="showResponseCard"
                className="d-flex justify-content-center align-items-center cursorPointer"
                style={{ cursor: "pointer", position: "absolute", left: "50%", top: "6%", transform: 'translate(-50%, 0%)' }}
                onClick={() => flipCard()}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: "5px" }}
                >
                  sync
                </span>
                Show Response
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}

export default Modal;
