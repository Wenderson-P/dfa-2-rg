export const reducer = (state, action) => {
  const { type, payload } = action;
  const payloadValue = payload.value;
  let rowsLength = state.rows.length;
  let auxRowArray = [...state.rows];

  switch (type) {
    case 'changeStateInput':
      let auxRows = [...state.rows];
      let auxStatesValues = [...state.statesValues];

      if (payloadValue > rowsLength) {
        for (payloadValue; rowsLength < payloadValue; rowsLength++) {
          let insideArray = Array(state.columns.length).fill('');
          auxRows.push(insideArray);
          auxStatesValues.push(payloadValue - 1);
        }
      } else {
        auxRows = state.rows.filter((_, index) => index <= payloadValue - 1);

        auxStatesValues = auxStatesValues.filter(
          (_, index) => index <= payloadValue - 1
        );
      }

      return {
        ...state,
        states: payloadValue,
        rows: auxRows,
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
      let goToArray = [...state.goto];
      let goToLength = state.goto.length;
      if (payloadValue > state[payload.target]) {
        for (payloadValue; goToLength < payloadValue; goToLength++) {
          goToArray.push('');
        }
      } else {
        goToArray = state.goto.filter((_, index) => index <= payloadValue - 1);
      }

      console.log({
        ...state,
        gotoQuantity: payload.value,
        goto: goToArray,
        rows: auxRowArray,
      });

      return {
        ...state,
        gotoQuantity: payload.value,
        goto: goToArray,
        rows: auxRowArray,
      };
    case 'changeStateQuantity':
      const { value, rowIndex, columnIndex } = payload;
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
    default:
      break;
  }
};
