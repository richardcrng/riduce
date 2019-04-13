import { reducerTree } from "../tree";
import { createStore } from "redux";


describe("API: reduxLeaves(initialState)", () => {

  describe("GIVEN nested initialState with non-null values for shape { bool, counter, foo: { value, nesting: { deep, manageable } } }", () => {
    const initialState = {
      bool: true,
      counter: 0,
      foo: {
        value: "foo",
        nesting: {
          deep: true,
          manageable: false,
        }
      },
      object: {}
    }

    describe("WHEN reducer = reducerTree(initialState)", () => {
      const reducer = reducerTree(initialState)

      test("THEN reducer is a function", () => {
        expect(typeof reducer).toBe("function")
      })

      test("AND reducer.bool is a function", () => {
        expect(typeof reducer.bool).toBe("function")
      })

      test("AND reducer.object is a function", () => {
        expect(typeof reducer.object).toBe("function")
      })

      test("AND reducer.foo is an object", () => {
        expect(typeof reducer.foo).toBe("object")
      })

      test("AND reducer.foo.value is a function", () => {
        expect(typeof reducer.foo.value).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })
      })
    })
  })
})

describe("API: leaf", () => {

  describe(".apply(callback): returns an action that, when dispatched, updates the leaf's state to the return value of callback(state)", () => {

    describe("GIVEN non-trivially nested API (as in the documentation)", () => {
      const initialState = {
        counter: 1,
        foo: "foo",
        nested: {
          deep: {},
          state: {
            manageable: "maybe...?"
          }
        }
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.counter.apply is a function", () => {
          expect(typeof reducer.counter.apply).toBe("function")
        })

        test("AND reducer.foo.apply is a function", () => {
          expect(typeof reducer.foo.apply).toBe("function")
        })

        test("AND reducer.nested.deep.apply is a function", () => {
          expect(typeof reducer.nested.deep.apply).toBe("function")
        })

        test("AND reducer.nested.state.manageable.apply is a function", () => {
          expect(typeof reducer.nested.state.manageable.apply).toBe("function")
        })


        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          describe("AND we dispatch reducer.counter.apply(n => n * 7)", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.apply(n => n * 7))
            })

            test("THEN reducer.counter updates to 7", () => {
              const state = store.getState()
              expect(state.counter).toBe(7)
              expect(state).toEqual({ ...initialState, counter: 7 })
            })
          })

          describe("AND we dispatch reducer.foo.apply(str => str.toUpperCase())", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.apply(str => str.toUpperCase()))
            })

            test("THEN reducer.foo updates to 'FOO'", () => {
              const state = store.getState()
              expect(state.foo).toBe('FOO')
              expect(state).toEqual({ ...initialState, foo: "FOO" })
            })
          })

        })
      })
    })
  })
})
