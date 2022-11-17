const config = require("../config");

function Deck({
  currentDeck,
  getDataDecks,
  currentName,
  showModalEditDeck,
  showModalNewCard,
  showModalCardsList,
  updateCurrentDeck,
  showModalCardView,
}) {
  const deleteDeck = async (id) => {
    if (!window.confirm("Are you sure of delete this deck?")) return;

    try {
      const RawResponse = await fetch(config.service + "/deck/delete/" + id);
      const response = await RawResponse.json();

      getDataDecks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="deckContainer">
      <div className="card mb-3">
        <div className="card-header">
          <div id="selectedDeckName" className="">
            {currentDeck.name}
          </div>

          <div className="d-flex justify-content-end">
            <div>
              <button
                onClick={() => showModalEditDeck(true)}
                type="button"
                className="btn btn-sm btn-outline-secondary lh-100 me-2"
              >
                <span className="material-symbols-outlined iconMedium">
                  edit
                </span>
              </button>
            </div>
            <div>
              <button
                onClick={() => deleteDeck(currentDeck._id)}
                type="button"
                className="btn btn-sm btn-outline-secondary lh-100"
              >
                <span className="material-symbols-outlined iconMedium ">
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row py-3 justify-content-center">
            <div className="col-md-3 col-6 d-flex flex-column align-items-center">
              <h1 id="amountCards" className="text-Light bold">
                {currentDeck.cards.length || "0"}
              </h1>
              <span className="cardFontSize">Cards</span>
            </div>
          </div>

          <div className="mt-5 d-flex justify-content-center flex-gap-2">
            <button
              id="btnStudySession"
              type="button"
              className="btn mb-1 btn-primary"
              onClick={(e) => showModalCardView(true)}
            >
              Study Session
            </button>
            <button
              id="btnOpenCard"
              data-toggle="modal"
              data-target="#modalFormNewCard"
              type="button"
              className="btn mb-1 btn-success mx-3"
              onClick={() => showModalNewCard(true)}
            >
              Create Card
            </button>
            <button
              id="btnOpenCardsLst"
              data-toggle="modal"
              data-target="#modalCadsList"
              type="button"
              className="btn mb-1 btn-warning"
              onClick={() => showModalCardsList(true)}
            >
              Cards List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
