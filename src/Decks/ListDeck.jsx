import React, {useState, useEffect} from "react";
import {listDecks, deleteDeck} from "../utils/api/index";
import { Link } from "react-router-dom";


function ListDecks() {
const [decks, setDecks] = useState([])


useEffect(()=>{
    async function loadDeck() {
try {
    const decksData = await listDecks()
    console.log(decksData)
    setDecks(decksData)
} catch (error) {
    if (error.name === "AbortError") {
    console.log(error)
} else {
    throw error;
} 
    }
 }
    loadDeck();
},[])

const deleteHandler = async ({ target }) => {
    const value = target.value;
    console.log(value)
    const result = window.confirm(`Delete deck ID ${value}? You will not be able to recover it.`);
    if (result) {
      async function deleteData() {
         try {
          await deleteDeck(value);
          const output = await listDecks();
          setDecks(output);
         window.location.reload();
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
        } else {
            throw error;
        }
      }
    }
    deleteData();
    }
  };


    return (
    <div>
    <hr></hr>
    <div>
        {decks.map((deck)=>{
       return <div key={deck.id}>
        <div className="row justify-content-between">
            <h2>{deck.name}</h2>
            <p>{deck.cards.length} cards</p> 
        </div>
        <p>{deck.description}</p>
        <div>
            <div className="row justify-content-between">
                <div className="col-4">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link> &nbsp;
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                </div>
                <div className="col-1">
                    <button className="btn btn-danger" value={deck.id} onClick={deleteHandler}>Delete</button>
                </div>
            </div>
            <hr></hr>
        </div>
        </div>
        })}
    </div>
    </div>
    )
}

export default ListDecks;