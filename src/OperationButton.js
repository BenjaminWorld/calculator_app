import { ACTIONS } from "./App"
import React from 'react';

export default function OperationButton({dispatch, operation}) {
    return (
    <button className="colourless" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>
        {operation}
    </button>
    )
}