import riduce from "../../../src";

// @dts-jest:group Explicit state typing
{
  interface State {
    bool: boolean;
    num: number;
    str: string;
    arr: { number: number }[];
    random?: any;
  }

  const initialState: State = {
    bool: false,
    num: 2,
    str: "foo",
    arr: [{ number: 4 }, { number: 2 }, { number: 7 }],
  };

  const [_, actions] = riduce(initialState);

  // @dts-jest:pass Root state can take noop
  actions.create.noop();

  // @dts-jest:pass Exists on all leaves
  actions.bool.create.noop();
  actions.num.create.noop();
  actions.str.create.noop();
  actions.arr[0].number.create.noop();
}

// @dts-jest:group Inferred state typing
{
  const initialState = {
    bool: false,
    num: 2,
    str: "foo",
    arr: [{ number: 4 }, { number: 2 }, { number: 7 }],
  };

  const [_, actions] = riduce(initialState);

  // @dts-jest:pass Root state can take noop
  actions.create.noop();

  // @dts-jest:pass Exists on all leaves
  actions.bool.create.noop();
  actions.num.create.noop();
  actions.str.create.noop();
  actions.arr[0].number.create.noop();
}
