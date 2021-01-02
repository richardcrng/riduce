import { renderHook, act } from "@testing-library/react-hooks";
import useRiducer from "./useRiducer";
import bundle from "../bundle";

describe("useRiducer", () => {
  it("provides state, dispatch and actions", () => {
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

    expect(result.current.state).toEqual(initialState);
    expect(typeof result.current.dispatch).toBe("function");
    expect(result.current.actions).toHaveProperty("create");
  });

  it("lets you dispatch actions that then update state as expected", () => {
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
    const newMessage = "this is a new thing!";

    act(() => {
      const action = result.current.actions.messages.create.push(newMessage);
      result.current.dispatch(action);
    });

    expect(result.current.state.messages).toHaveLength(2);
    expect(result.current.state.messages).toEqual([
      ...initialState.messages,
      newMessage,
    ]);
  });

  it("can process sequential dispatches", () => {
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
    const newMessage = "second in my bundle";

    act(() => {
      result.current.dispatch(
        result.current.actions.messages.create.push(newMessage)
      );
      result.current.dispatch(
        result.current.actions.counter.create.increment(1000)
      );
      result.current.dispatch(
        result.current.actions.nested.state.isHard.create.toggle()
      );
    });

    expect(result.current.state).toEqual({
      counter: 1000,
      messages: [...initialState.messages, newMessage],
      nested: {
        state: {
          isHard: false,
        },
      },
    });
  });

  it("can process bundled updates", () => {
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
    const newMessage = "second in my bundle";

    act(() => {
      result.current.dispatch(
        bundle([
          result.current.actions.messages.create.push(newMessage),
          result.current.actions.counter.create.increment(1000),
          result.current.actions.nested.state.isHard.create.toggle(),
        ])
      );
    });

    expect(result.current.state).toEqual({
      counter: 1000,
      messages: [...initialState.messages, newMessage],
      nested: {
        state: {
          isHard: false,
        },
      },
    });
  });
});
