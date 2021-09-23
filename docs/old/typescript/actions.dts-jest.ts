import riduce from "../../../src"


// @dts-jest:group Actions shape mirrors state
{
  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat'
      }
    },
    list: [1, 2, 3]
  }

  const [reducer, actions] = riduce(initialState)

  // @dts-jest:pass
  actions.shallow

  // @dts-jest:fail
  actions.foobar

  // @dts-jest:pass
  actions.nested.counter

  // @dts-jest:fail
  actions.nested.string
}

// @dts-jest:group Action keys are not possibly undefined but is sensitive to passing undefined
{
  interface State {
    num: number;
    nested?: {
      deep?: boolean;
    };
  }

  const initialState: State = {
    num: 4,
    nested: {
      deep: true,
    },
  };

  const [reducer, actions] = riduce(initialState);

  // @dts-jest:pass
  actions.nested.deep;

  // @dts-jest:pass
  actions.nested.deep.create.update(undefined);

  // @dts-jest:fail
  actions.num.create.update(undefined);
}

// @dts-jest:group Creator update is sensitive to the leaf type
{
  const initialState = {
    boolState: true,
    nested: {
      num: 0,
      state: {
        str: 'somewhat'
      }
    },
    numList: [1, 2, 3]
  }

  const [reducer, actions] = riduce(initialState)

  // @dts-jest:pass
  actions.boolState.create.update(true)

  // @dts-jest:pass
  actions.boolState.create.update(false)

  // @dts-jest:fail 
  actions.boolState.create.update('true')

  // @dts-jest:pass
  actions.nested.num.create.update(5)

  // @dts-jest:fail
  actions.nested.num.create.update('5')

  // @dts-jest:pass
  actions.nested.state.create.update({
    str: 'foobar'
  })

  // @dts-jest:fail
  actions.nested.state.create.update({ randomKey: 'foobar' })

  // @dts-jest:pass
  actions.numList.create.update([2, 4, 8])

  // @dts-jest:fail
  actions.numList.create.update(['2'])
}