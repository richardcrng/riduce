import { createStore } from "redux";
import riduce from "../../../src";

describe("leaf.create.noop(): returns an action that, when dispatched, makes no changes to state", () => {
  const initialState = {
    num: 10,
    arr: ["foo", "bar"],
    nested: {
      arbitrarily: {
        deep: true,
      },
    },
  };

  const [reducer, actions] = riduce(initialState);
  const { dispatch, getState } = createStore(reducer);

  test("noop makes no changes on a leaf", () => {
    dispatch(actions.num.create.noop());
    dispatch(actions.arr[0].create.noop());
    dispatch(actions.nested.arbitrarily.deep.create.noop());
    expect(getState()).toStrictEqual(initialState);
  });

  test("noop makes no changes on the root", () => {
    dispatch(actions.create.noop());
    expect(getState()).toStrictEqual(initialState);
  });
});
