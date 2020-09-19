import { useReducer } from 'react';
import { createStore } from 'redux';
import riduce, { Riducer, ActionWithPayload } from '.';

// @dts-jest:group Library consistency
{
  const initialState = {
    name: 'Richard',
    coder: true,
  };

  const [reducer, actions] = riduce(initialState);

  function Empty() {
    // @dts-jest:pass Works with useReducer
    const [state, dispatch] = useReducer(reducer, initialState);

    return null;
  }

  // @dts-jest:pass Works with createStore
  const store = createStore(reducer);
}

// @dts-jest:group Actions shape mirrors state
{
  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat',
      },
    },
    list: [1, 2, 3],
  };

  const [reducer, actions] = riduce(initialState);

  // @dts-jest:pass Root actions has a create
  actions.create;

  // @dts-jest:pass
  actions.create.update;

  // @dts-jest:pass Root actions create.update takes state shape
  const updateAction = actions.create.update({
    shallow: false,
    nested: {
      counter: 5,
      state: {
        deep: 'foobar',
      },
    },
    list: [4, 10, 2],
  });

  // @dts-jest:pass Reducer can take this created action
  reducer(initialState, updateAction);

  // @dts-jest:fail Root actions create.update requires argument
  actions.create.update();

  // @dts-jest:fail Root actions create.update requires conforming argument
  actions.create.update({ shallow: 'false' });

  // @dts-jest:pass
  actions.shallow;

  // @dts-jest:fail
  actions.foobar;

  // @dts-jest:pass
  actions.nested.counter;

  // @dts-jest:fail
  actions.nested.string;
}

// @dts-jest:group Creators are sensitive to the leaf type
{
  const initialState = {
    boolState: true,
    nested: {
      num: 0,
      state: {
        str: 'somewhat',
      },
    },
    numList: [1, 2, 3],
  };

  const [reducer, actions] = riduce(initialState);

  // @dts-jest:pass Update can be passed boolean for boolState
  actions.boolState.create.update(true);

  // @dts-jest:fail Update cannot be passed string for boolState
  actions.boolState.create.update('true');

  // @dts-jest:pass Update can be passed number for number state
  actions.nested.num.create.update(5);

  // @dts-jest:fail Update cannot be passed string for number state
  actions.nested.num.create.update('5');

  // @dts-jest:pass Update can be passed object for object state
  actions.nested.state.create.update({
    str: 'foobar',
  });

  // @dts-jest:fail Update cannot be passed bad object for object state
  actions.nested.state.create.update({ randomKey: 'foobar' });

  // @dts-jest:pass Update can be passed number[] for number[] state
  actions.numList.create.update([2, 4, 8]);

  // @dts-jest:fail Update cannot be passed string[] for number[]
  actions.numList.create.update(['2']);
}

// @dts-jest:group Custom reducer, explicitly typed
{
  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat',
      },
    },
    list: [1, 2, 3],
  };

  const multiplyBy: Riducer<{
    leafState: number;
    payload: number;
    args: [number];
  }> = {
    argsToPayload: (num) => num,
    reducer: (leafState, action) => leafState * action.payload,
  };

  const [reducer, actions] = riduce(initialState, { multiplyBy });

  // @dts-jest:fail does not exist on boolean state
  actions.shallow.create.multiplyBy;

  // @dts-jest:pass exists on number state
  actions.nested.counter.create.multiplyBy;

  // @dts-jest:fail needs an argument
  actions.nested.counter.create.multiplyBy();

  // @dts-jest:pass accepts numerical argument
  actions.nested.counter.create.multiplyBy(2);

  // @dts-jest:fail rejects string argument
  actions.nested.counter.create.multiplyBy('2');
}

// @dts-jest:group Custom reducer, implicitly typed
{
  const initialState = {
    shallow: true,
    nested: {
      counter: 0,
      state: {
        deep: 'somewhat',
      },
    },
    list: [1, 2, 3],
  };

  const multiplyBy = {
    argsToPayload: (num: number) => num,
    reducer: (leafState: number, action: ActionWithPayload<number>) => leafState * action.payload,
  };

  const [reducer, actions] = riduce(initialState, { multiplyBy });

  // @dts-jest:fail does not exist on boolean state
  actions.shallow.create.multiplyBy;

  // @dts-jest:pass exists on number state
  actions.nested.counter.create.multiplyBy;

  // @dts-jest:fail needs an argument
  actions.nested.counter.create.multiplyBy();

  // @dts-jest:pass accepts numerical argument
  actions.nested.counter.create.multiplyBy(2);

  // @dts-jest:fail rejects string argument
  actions.nested.counter.create.multiplyBy('2');
}
