import React, { useState, useEffect } from "react";

const config = require("../../config");

function Modal({
  isVisibleModal,
  showModal,
  currentDeck,
  updateCurrentDeck,
  showModalEdit,
}) {
  const [state, setState] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  const deleteCard = async (idCard) => {
    if (!window.confirm("Are you sure of delete this card?")) return;

    try {
      let currentDeckId = currentDeck == null ? null : currentDeck._id;
      const RawResponse = await fetch(
        config.service + "/deck/card/delete/" + currentDeckId + "/" + idCard
      );
      const response = await RawResponse.json();

      console.log(response);

      updateCurrentDeck();
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
          <h5 className="modal-title">Cards List</h5>
        </span>

        <div className="mt-4">
          <div>
            <div className="modal-body">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Question</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeck != null && currentDeck.cards.length != 0 ? (
                    currentDeck.cards.map((card, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{card.question}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary lh-100 me-2"
                            onClick={() => showModalEdit(true, card)}
                          >
                            <span className="material-symbols-outlined iconMedium">
                              edit
                            </span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary lh-100"
                            onClick={() => deleteCard(card._id)}
                          >
                            <span className="material-symbols-outlined iconMedium ">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : currentDeck != null && currentDeck.cards.length == 0 ? (
                    <tr>
                      <td align="center" colSpan="3">
                        There's not cards to see
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td align="center" colSpan="3">
                        There's not cards to see
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer borderColorModal justify-content-center">
              <button
                onClick={() => showModal(false)}
                type="button"
                className="btn btn-outline-primary"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
