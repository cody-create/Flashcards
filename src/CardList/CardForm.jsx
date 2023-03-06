import React from "react"

function CardForm({ formData, changeHandler }) {
    return (
        <div>
            <label>front</label>
            <br />
            <textarea name="front" placeholder="Front side of the card" onChange={changeHandler} value={formData.front}></textarea>
            <br />
            <textarea name="back" placeholder="Back side of the card" onChange={changeHandler} value={formData.back}></textarea>
            <br />
        </div>
    )
}
export default CardForm