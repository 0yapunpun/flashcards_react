function Sidebar({ decks, showModal, setCurrentDeck }) {
  return (
    <div id="sidebar" className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <ul>
            <li className="header-menu d-flex align-items-center justify-content-between">
              Mazos
              <button
                onClick={() => showModal(true)}
                type="button"
                className="btn btn-flat mb-1 btn-outline-secondary d-flex"
                title="Crear Mazo"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </li>
            <div id="cDecksList">
              {decks.length != 0 ? (
                decks.map((deck, i) => (
                  <li
                    onClick={() => setCurrentDeck(deck._id)}
                    className=""
                    key={i}
                  >
                    <a className="elementListMenu">
                      <span className="menu-text listMenu">{deck.name}</span>
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-center mt-2">Sin mazos por mostrar</p>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
