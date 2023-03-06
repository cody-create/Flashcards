import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'
import { readDeck, readCard, updateCard } from '../utils/api/index'
import CardForm from './CardForm'

function EditCard() {
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    useEffect(() => {
        setDeck({});
        async function loadData() {
            try {
                const dataFromAPI = await readDeck(deckId);
                setDeck(dataFromAPI);
                const dataFromAPI2 = await readCard(cardId);
                setCard(dataFromAPI2)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadData();
    }, [deckId, cardId])
    
    const changeHandler = ({ target }) => {
        const value = target.value;
        setCard({
            ...card,
            [target.name]:value,
        })
    }
    const history = useHistory();
    const handleSubmit = (event) => {

        event.preventDefault();
        async function updateData() {
            try {
                await updateCard(card);
                history.push(`/decks/${deckId}`);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted")
                } else {
                    throw error;
                }
            }
        }
        updateData();
    };
    if (deck) {
        return (
               <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="2">Edit Card {cardId}</li>
                </ol>
            </nav>
            <br />
        <h1>Edit Card</h1>
    <form onSubmit={handleSubmit}>
           <CardForm changeHandler={changeHandler} formData={card}/>
            <Link to={`/decks/${deckId}`}>Cancel</Link>
            <button type="submit">Submit</button>
    </form>
        </div>
    )
} else {
    return "Loading"
}
}

export default EditCard;
