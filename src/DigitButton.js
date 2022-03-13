import { ACTIONS } from "./App"
import React, { Component } from 'react';

export default function DigitButton({dispatch, digit}) {
    return (
    <button className="colourless" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})}>
        {digit}
    </button>
    )
}