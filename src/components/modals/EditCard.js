import React, { useState, useEffect } from "react";

const config = require("../../config");

function Modal({
  showModalList,
  isVisibleModal,
  currentCard,
  currentDeck,
  updateCurrentDeck,
}) {
  const [state, setState] = useState({
    question: currentCard == null ? "" : currentCard.question,
    answer: currentCard == null ? "" : currentCard.answer,
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const editCard = async () => {
    try {
      const RawResponse = await fetch(config.service + "/deck/card/edit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDeck: currentDeck == null ? "" : currentDeck._id,
          idCard: currentCard == null ? "" : currentCard._id,
          question: state.question,
          answer: state.answer,
        }),
      });
      const response = await RawResponse.json();

      updateCurrentDeck(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"modal " + (isVisibleModal == true ? "showModal" : "")}>
      <div className="modal-content-custom">
        <span
          onClick={(e) => showModalList(false)}
          className="closeModal noselect"
        >
          &times;
        </span>

        <span className="tittleModal noselect">
          <h5 className="modal-title">Edit Card</h5>
        </span>

        <div className="mt-4">
          <div>
            <div className="modal-body">
              <div className="form-group d-flex flex-column">
                <label>Question</label>
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  value={state.question}
                  className="form-contro p-1"
                  id="inputNewCardQuestion"
                  name="question"
                ></textarea>

                <label className="mt-3">Answer</label>
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  value={state.answer}
                  className="form-contro p-1"
                  id="inputNewCardAnswer"
                  name="answer"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer borderColorModal justify-content-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={() => editCard()}
                type="button"
                className="btn btn-outline-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
