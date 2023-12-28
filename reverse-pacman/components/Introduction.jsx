import {handleClick} from "../helpers/timeHandler.js";

function Introduction() {
    return(
        <>
            <h1>Hello World</h1>

            <button onClick={handleClick}>Click for Time</button>
        </>
    )
}

export default Introduction
