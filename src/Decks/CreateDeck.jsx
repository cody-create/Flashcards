import React, {useState} from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck () {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
    }

    const [deck, setDeck] = useState({name: "", description: ""})

    const changeHandler = ({target}) => {
    setDeck({
        ...deck,
    [target.name]: target.value
    })
    }
    async function submitHandler (event) {
        event.preventDefault();
        const response = await createDeck(deck);
        history.push(`/decks/${response.id}`)
    }
    
 const cancelHandler = (event) => {
    event.preventDefault();
    setDeck({...initialFormState})
    }


    return (
        <div>
             <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="1">Create Deck</li>
                </ol>
            </nav>
        <h1>Create Deck</h1>
    <form>
        <div>
            <label>Name</label>
            <br/>
            <input type="name" name="name" onChange={changeHandler} placeholder="Deck Name" value={deck.name}></input>
            <br/>
            <br/>
            <label>Description</label>
            <br/>
            <textarea type="text" name="description" onChange={changeHandler} placeholder="Brief description of the deck" value={deck.description}></textarea>
            <br/>
            <button className="btn btn-primary" onClick={cancelHandler}>Cancel</button>
            <button onClick={submitHandler}className="btn btn-secondary" type="submit">Submit</button>
        </div>
    </form>
        </div>
    )
}

export default CreateDeck;