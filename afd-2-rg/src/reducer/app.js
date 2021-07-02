export const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "changeStateInput":
      const stateValue = payload.value

      let rowsLength = state.rows.length
      let auxRows = [...state.rows]
      let auxStatesValues = [...state.statesValues]

      if (stateValue > rowsLength) {
        for (stateValue; rowsLength < stateValue; rowsLength++) {
          let insideArray = Array(state.columns.length).fill("")
          auxRows.push(insideArray);
          auxStatesValues.push("q"+(stateValue-1))
        }
      } else {
        auxRows = state.rows.filter(
          (_, index) => index <= stateValue - 1)

        auxStatesValues = auxStatesValues.filter(
          (_, index) => index <= stateValue - 1)
      }

      return {
        ...state,
        states: stateValue,
        rows: auxRows,
        statesValues : auxStatesValues
      }
    case "changeSymbolsInput":
      const inputValue = payload.value

      let arraySize = state.columns.length
      let columsArray = [...state.columns]
      let auxRowArray = [...state.rows];

      if (inputValue > state[payload.target]) {
        for (inputValue; arraySize < inputValue; arraySize++) {
          columsArray.push("")
        }

        for (let i = 0; i < state.states; i++) {
          for (let j = 0; j < inputValue; j++) {
            if (!auxRowArray[i][j]) {
              auxRowArray[i][j] = ""
            }
          }
        }
      } else {
        for (let i = 0; i < state.states; i++) {
          for (let j = state.columns.length; j >= inputValue; j--) {
              auxRowArray[i].splice(j,1)
          }
        }
        columsArray = state.columns.filter(
          (_, index) => index <= inputValue - 1);
      }

      return {
        ...state,
        [payload.target]: payload.value,
        columns: columsArray,
        rows: auxRowArray
      }

    case "changeStateQuantity":
      const { value, rowIndex, columnIndex } = payload;
      return {
        ...state,
        rows: state.rows.map((row, i) => row.map((cell, j) => {
          if (i === rowIndex && columnIndex === j) {
            return value
          } else {
            return cell
          }
        }))
      }
    case "changeInitialState":
      return {
        ...state,
        initialState: payload
      }
    case "changeFinalState":
      let auxFinalStates = [...state.finalStates]

      let valueIndex = auxFinalStates.findIndex((item) => item ===payload);

      if(valueIndex >=0){
        auxFinalStates.splice(valueIndex,1)
      }else{
        auxFinalStates.push(payload)
      }
      return {
        ...state,
        finalStates: auxFinalStates
      }
    case "changeStateValue":
      return {
        ...state,
        statesValues: state.statesValues.map((value, i) =>{
          if (i === payload.index) {
            return payload.value
          } else {
            return value
          }
        })
      }
      case "changeSymbol":
        return {
          ...state,
          columns: state.columns.map((value, i) =>{
            if (i === payload.index) {
              return payload.value
            } else {
              return value
            }
          })
        }
    case "changeAutomato":
      return {
        ...state,
        automato : payload
      }
    case "changeGrammar":
      return {
        ...state,
        grammar : payload
      }
    default:
      break;
  }
}