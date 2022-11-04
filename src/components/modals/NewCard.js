import React, { useState, useEffect } from "react";

const config = require("../../config");

function Modal({ showModal, isVisibleModal, currentDeck, updateCurrentDeck }) {
  const [state, setState] = useState({
    question: "",
    answer: "",
  });

  const handleInputChange = (e) => {
    console.log(e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const createCard = async () => {
    try {
      const RawResponse = await fetch(config.service + "/deck/card/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDeck: currentDeck == null ? "" : currentDeck._id,
          question: state.question,
          answer: state.answer,
        }),
      });
      const response = await RawResponse.json();

      updateCurrentDeck();
      document.getElementById("inputNewCardQuestion").value = "";
      document.getElementById("inputNewCardAnswer").value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"modal " + (isVisibleModal == true ? "showModal" : "")}>
      <div className="modal-content-custom">
        <span onClick={(e) => showModal(false)} className="closeModal noselect">
          &times;
        </span>

        <span className="tittleModal noselect">
          <h5 className="modal-title">Create Card</h5>
        </span>

        <div className="mt-4">
          <div>
            <div className="modal-body">
              <div className="form-group d-flex flex-column">
                <label>Question</label>
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  className="form-contro"
                  id="inputNewCardQuestion"
                  name="question"
                ></textarea>

                <label className="mt-3">Answer</label>
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  className="form-contro"
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
                onClick={() => createCard()}
                type="button"
                className="btn btn-outline-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
