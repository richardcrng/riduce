import { CreateFn } from "../types";
import makeArrayCreators, {
  madeArrayCreators,
} from "../array/makeArrayCreators";
import makeStringCreators, {
  madeStringCreators,
} from "../string/makeStringCreators";
import { isPlainObject } from "ramda-adjunct";
import makeObjectCreators, {
  madeObjectCreators,
} from "../object/makeObjectCreators";
import makeBooleanCreators, {
  madeBooleanCreators,
} from "../boolean/makeBooleanCreators";
import makeNumberCreators, {
  madeNumberCreators,
} from "../number/makeNumberCreators";
import makeCreatorOfTypeFromPath from "./makeCreatorOfTypeFromPath";

function makeTypedCreators<L>(
  leafState: L,
  path: (string | number)[]
): CreateFn<any> {
  // Array creators
  if (Array.isArray(leafState)) {
    return makeArrayCreators(leafState, path);
  }

  // String creators
  if (typeof leafState === "string") {
    return makeStringCreators(leafState, path);
  }

  if (typeof leafState === "boolean") {
    return makeBooleanCreators(leafState, path);
  }

  if (typeof leafState === "number") {
    return makeNumberCreators(leafState, path);
  }

  // Object creators
  if (isPlainObject(leafState)) {
    return makeObjectCreators(leafState, path);
  }

  if (typeof leafState === "undefined") {
    const makeCreatorOfType = makeCreatorOfTypeFromPath(path);

    return (passedType?: string) => {
      // const asArray = Array.isArray(leafState) ? leafState : [];
      // const asBoolean =
      //   typeof leafState === "boolean" ? leafState : Boolean(leafState);
      // const asNumber =
      //   typeof leafState === "number" ? leafState : Number(leafState);
      // const asString =
      //   typeof leafState === "string" ? leafState : String(leafState);
      // const asObject = isPlainObject(leafState) ? leafState : Object(leafState);

      return {
        ...madeArrayCreators([], path, makeCreatorOfType, passedType),
        ...madeBooleanCreators(false, path, makeCreatorOfType, passedType),
        ...madeNumberCreators(0, path, makeCreatorOfType, passedType),
        ...madeObjectCreators({}, path, makeCreatorOfType, passedType),
        ...madeStringCreators("", path, makeCreatorOfType, passedType),
      };
    };
  }

  return (_?: string) => ({});
}

export default makeTypedCreators;
