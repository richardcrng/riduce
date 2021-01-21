import { isArrayAction } from "../array/array-types";
import arrayLeafReducer from "../array/arrayLeafReducer";
import { isBooleanAction } from "../boolean/boolean-types";
import booleanLeafReducer from "../boolean/booleanLeafReducer";
import { isNumberAction } from "../number/number-types";
import numberLeafReducer from "../number/numberLeafReducer";
import { isObjectAction } from "../object/object-types";
import objectLeafReducer from "../object/objectLeafReducer";
import { isStringAction } from "../string/string-types";
import stringLeafReducer from "../string/stringLeafReducer";
import { Action } from "../types";
import universalLeafReducer from "../universal/universalLeafReducer";

function undefinedLeafReducer<L extends undefined, T, A extends Action>(
  leafState: L,
  treeState: T,
  action: A,
  originalState: T
): any {
  if (isArrayAction(action)) {
    return arrayLeafReducer([], treeState, action, originalState);
  }

  if (isBooleanAction(action)) {
    return booleanLeafReducer(false, treeState, action, originalState);
  }

  if (isNumberAction(action)) {
    return numberLeafReducer(0, treeState, action, originalState);
  }

  if (isObjectAction(action)) {
    return objectLeafReducer({}, treeState, action, originalState);
  }

  if (isStringAction(action)) {
    return stringLeafReducer("", treeState, action, originalState);
  }

  return universalLeafReducer(leafState, treeState, action, originalState);
}

export default undefinedLeafReducer;
