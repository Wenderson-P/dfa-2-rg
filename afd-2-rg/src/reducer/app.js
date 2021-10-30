export const reducer = (state, action) => {
  const { type, payload } = action;
  const payloadValue = payload.value;
  let rowsLength = state.rows.length;
  let auxRowArray = [...state.rows];
  const { value, rowIndex, columnIndex } = payload;

  switch (type) {
    case 'changeStateInput':
      let auxRows = [...state.rows];
      let auxGoToRows = [...state.goToRows];
      let auxStatesValues = [...state.statesValues];

      if (payloadValue > rowsLength) {
        for (payloadValue; rowsLength < payloadValue; rowsLength++) {
          let insideArray = Array(state.columns.length).fill('');
          let insideGotoArray = Array(state.goto.length).fill('');
          auxRows.push(insideArray);
          auxGoToRows.push(insideGotoArray);
          auxStatesValues.push(payloadValue - 1);
        }
      } else {
        auxRows = state.rows.filter((_, index) => index <= payloadValue - 1);
        auxGoToRows = state.goToRows.filter(
          (_, index) => index <= payloadValue - 1
        );
        auxStatesValues = auxStatesValues.filter(
          (_, index) => index <= payloadValue - 1
        );
      }
      console.log(auxGoToRows);

      return {
        ...state,
        states: payloadValue,
        rows: auxRows,
        goToRows: auxGoToRows,
        statesValues: auxStatesValues,
      };
    case 'changeActionsInput':
      let columnsLength = state.columns.length;
      let columsArray = [...state.columns];

      if (payloadValue > state[payload.target]) {
        for (payloadValue; columnsLength < payloadValue; columnsLength++) {
          columsArray.push('');
        }

        for (let i = 0; i < state.states; i++) {
          for (let j = 0; j < payloadValue; j++) {
            if (!auxRowArray[i][j]) {
              auxRowArray[i][j] = '';
            }
          }
        }
      } else {
        for (let i = 0; i < state.states; i++) {
          for (let j = state.columns.length; j >= payloadValue; j--) {
            auxRowArray[i].splice(j, 1);
          }
        }
        columsArray = state.columns.filter(
          (_, index) => index <= payloadValue - 1
        );
      }

      return {
        ...state,
        [payload.target]: payload.value,
        columns: columsArray,
        rows: auxRowArray,
      };
    case 'changeGoToInput':
      let goToLength = state.goto.length;
      auxRowArray = [...state.goToRows];
      let gotoValues = [...state.goto];

      if (payloadValue > state[payload.target]) {
        for (payloadValue; goToLength < payloadValue; goToLength++) {
          gotoValues.push('');
        }
        for (let i = 0; i < state.states; i++) {
          for (let j = 0; j < payloadValue; j++) {
            if (!auxRowArray[i][j]) {
              auxRowArray[i][j] = '';
            }
          }
        }
      } else {
        for (let i = 0; i < state.states; i++) {
          for (let j = state.goToRows.length; j >= payloadValue; j--) {
            auxRowArray[i].splice(j, 1);
          }
        }
        gotoValues = state.goto.filter((_, index) => index <= payloadValue - 1);
      }

      return {
        ...state,
        gotoQuantity: payload.value,
        goto: gotoValues,
        goToRows: auxRowArray,
      };
    case 'changeProductionInput':
      let productionsLength = state.productions.length;
      let productionValues = [...state.productions];

      if (payloadValue > state[payload.target]) {
        for (
          payloadValue;
          productionsLength < payloadValue;
          productionsLength++
        ) {
          productionValues.push('->');
        }
      } else {
        productionValues = state.productions.filter(
          (_, index) => index <= payloadValue - 1
        );
      }

      return {
        ...state,
        productionQuantity: payload.value,
        productions: productionValues,
      };
    case 'changeStateQuantity':
      return {
        ...state,
        rows: state.rows.map((row, i) =>
          row.map((cell, j) => {
            if (i === rowIndex && columnIndex === j) {
              return value;
            } else {
              return cell;
            }
          })
        ),
      };
    case 'changeGoToValue':
      return {
        ...state,
        goToRows: state.goToRows.map((row, i) =>
          row.map((cell, j) => {
            if (i === rowIndex && columnIndex === j) {
              return value;
            } else {
              return cell;
            }
          })
        ),
      };
    case 'changeInitialState':
      return {
        ...state,
        initialState: payload,
      };
    case 'changepayloadValue':
      return {
        ...state,
        statesValues: state.statesValues.map((value, i) => {
          if (i === payload.index) {
            return payload.value;
          } else {
            return value;
          }
        }),
      };

    case 'changePropertyValue': {
      return {
        ...state,
        columns: state[payload.property].map((value, i) => {
          if (i === payload.index) {
            return payload.value;
          } else {
            return value;
          }
        }),
      };
    }
    case 'changeSymbol':
      return {
        ...state,
        columns: state.columns.map((value, i) => {
          if (i === payload.index) {
            return payload.value;
          } else {
            return value;
          }
        }),
      };
    case 'changeGoToSymbol':
      return {
        ...state,
        goto: state.goto.map((value, i) => {
          if (i === payload.index) {
            return payload.value;
          } else {
            return value;
          }
        }),
      };
    case 'changeProductionValue':
      return {
        ...state,
        productions: state.productions.map((value, i) => {
          if (i === payload.index) {
            return payload.value;
          } else {
            return value;
          }
        }),
      };
    default:
      break;
  }
};
