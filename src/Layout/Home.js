import React from "react";
import { Link } from "react-router-dom";
import ListDecks from "../Decks/ListDeck";

function Home() {
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary">
        + Create Deck
      </Link>
      <ListDecks />
    </div>
  );
}

export default Home;
