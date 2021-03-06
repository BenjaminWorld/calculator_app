import { useReducer } from 'react';
import React, { Component } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';
import './styles.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVAULATE: 'evaulate'
}

function reducer(state, { type, payload }) {
  switch(type) {

    // here is the case for adding numerical digits
    case ACTIONS.ADD_DIGIT:
      // to overwrite the computed result in the previous operation, instead of adding new digits to the result
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand === null) {
        return state
      }
      if (state.currentOperand) {
        if (payload.digit === "." && state.currentOperand.includes(".")) 
          return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    
      // Action for picking calculating operations
    case ACTIONS.CHOOSE_OPERATION:
        if (state.previousOperand == null && state.currentOperand == null) {
          return state
        }
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation 
          }
        }
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
        return {
          ...state, 
          previousOperand: evaulate(state),
          operation: payload.operation,
          currentOperand: null
        }

    // AC function in the calculator 
    case ACTIONS.CLEAR:
      return {}

    case  ACTIONS.DELETE_DIGIT:
      if (state.overwrite) 
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) 
        return {
          ...state,
          currentOperand: null
      }
      // default delete operation
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }

    case ACTIONS.EVAULATE:
      // if either currentOperand, previousOperand, or operation is null, the calculation is unable to execute
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state

      return { 
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaulate(state)
      }
  }
}

function evaulate({ currentOperand, previousOperand, operation }) {
  const prev =  parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  
  if (isNaN(prev) || isNaN(current)) 
    return ""

  let computation = ""

  switch(operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "??":
      computation = prev / current
      break 
  }

  return computation.toString() 
}

// I used the useReducer function for the calculator logic, and the state is divided into 3 variables: currentOperand, previousOperand, and operation
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,{})
  
  return (
    <div className='calculator-grid'>

        <div className='output'>
          <div className='previous-operand'>{previousOperand} {operation}</div>
          <div className='current-operand'>{currentOperand}</div>
        </div>
 
        <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button className="colourless" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation="??" dispatch={dispatch} ></OperationButton>
        <DigitButton digit="1" dispatch={dispatch}></DigitButton>
        <DigitButton digit="2" dispatch={dispatch}></DigitButton>
        <DigitButton digit="3" dispatch={dispatch}></DigitButton>
        <OperationButton operation="*" dispatch={dispatch} ></OperationButton>
        <DigitButton digit="4" dispatch={dispatch}></DigitButton>
        <DigitButton digit="5" dispatch={dispatch}></DigitButton>
        <DigitButton digit="6" dispatch={dispatch}></DigitButton>
        <OperationButton operation="+" dispatch={dispatch} ></OperationButton>
        <DigitButton digit="7" dispatch={dispatch}></DigitButton>
        <DigitButton digit="8" dispatch={dispatch}></DigitButton>
        <DigitButton digit="9" dispatch={dispatch}></DigitButton>
        <OperationButton operation="-" dispatch={dispatch} ></OperationButton>
        <DigitButton digit="." dispatch={dispatch}></DigitButton>
        <DigitButton digit="0" dispatch={dispatch}></DigitButton>
        <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVAULATE })}>=</button>

    </div>
  );
}

export default App;
