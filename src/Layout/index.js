import React from "react";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "../Decks/CreateDeck";
import AddCard from "../CardList/AddCards";
import Study from "../Decks/Study";
import EditDeck from "../Decks/EditDeck";
import Deck from "../Decks/Decks";
import EditCard from "../CardList/EditCard";
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact={true} path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
