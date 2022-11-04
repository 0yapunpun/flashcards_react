import React, { useState, useEffect } from "react";

const config = require("../../config");

function Modal({ isVisibleModal, showModal, getDataDecks }) {
  const [state, setState] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  const sendNewDeck = async (e) => {
    try {
      const RawResponse = await fetch(config.service + "/deck/create", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
        }),
      });
      const response = await RawResponse.json();

      getDataDecks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"modal " + (isVisibleModal ? "showModal" : "")}>
      <div className="modal-content-custom">
        <span onClick={(e) => showModal(false)} className="closeModal noselect">
          &times;
        </span>

        <span className="tittleModal noselect">
          <h5 className="modal-title">Crear Mazo</h5>
        </span>

        <div className="mt-4">
          <div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  onChange={handleInputChange}
                  value={state.name}
                  type="text"
                  className="form-control"
                  placeholder=""
                />
              </div>
            </div>
            <div className="modal-footer borderColorModal justify-content-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={sendNewDeck}
                type="button"
                className="btn btn-outline-primary"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
