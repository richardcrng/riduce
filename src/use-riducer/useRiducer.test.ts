import { renderHook, act } from "@testing-library/react-hooks";
import useRiducer from "./useRiducer";

describe("useRiducer", () => {
  const initialState = {
    counter: 0,
    messages: ["hello world!"],
    nested: {
      state: {
        isHard: true,
      },
    },
  };

  const { result } = renderHook(() => useRiducer(initialState));

  it("has a state property", () => {
    expect(result.current.state).toBeDefined();
  });

  it("uses initial state values passed in", () => {
    expect(result.current.state).toEqual(initialState);
  });

  it("provides a dispatch function", () => {
    expect(typeof result.current.dispatch).toBe("function");
  });
});
