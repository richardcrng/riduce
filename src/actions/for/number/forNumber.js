import { atomicActions } from "../../atomic";
import { conditions } from '../../condtions/conditions';
import { makeActionTemplate } from "../utils";

export const forNumber = (pathToLeafOrBranch = []) => {
  const actionTemplate = makeActionTemplate(
    pathToLeafOrBranch,
    { condition: conditions.NUMBER }
  )

  const increment = (n = 1) => actionTemplate(atomicActions.INCREMENT, n)

  return {
    increment
  }
}