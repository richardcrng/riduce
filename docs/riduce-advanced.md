# Riduce 👻: advanced usage

**Get *rid* of your reducer boilerplate!**

*Zero hassle state management that's typed, flexible and scalable.*

You've seen how even basic usage of Riduce provides [zero hassle setup, scalable state management and typesafe action creators](../README.md).

There's *even more* that you can do with Riduce:
1. [Bundle multiple actions](#bundle-multiple-actions) into a single dispatch;
2. [Execute arbitrary reducer logic](#execute-arbitrary-reducer-logic) for extendability;
3. [Add custom reducers](#add-custom-reducers) for reusability; and
4. [Control action type](#control-action-type) for debugging (e.g. Redux DevTools).

## Bundle multiple actions
```ts
import { createStore } from 'redux'
import riduce from 'riduce'

const museumState = {
  isOpen: false,
  visitor: {
    counter: 0,
    guestbook: ['richard woz here']
  }
}

const [reducer, actions] = riduce(museumState)
const { getState, dispatch } = createStore(reducer)
```
Riduce's `actions` gives us access to lots of atomic action creators at any node on our state tree, e.g.
- `actions.isOpen.create.toggle()`
- `actions.visitor.counter.create.increment(5)`
- `actions.visitor.guestbook.create.push("LOL from js fan")`

We can build a single complex action out of these atomic actions using `bundle`:

```ts
import { bundle } from 'riduce'

const actionsBundle = bundle([
  actions.isOpen.create.toggle(),
  actions.visitor.counter.create.increment(5),
  actions.visitor.guestbook.create.push("LOL from js fan")
])

dispatch(actionsBundle)

getState()
/*
{
  isOpen: true,
  visitor: {
    counter: 5,
    guestbook: [
      'richard woz here',
      'LOL from js fan'
    ]
  }
}
*/
```

## Execute arbitrary reducer logic
Sometimes the simple atomic action creators - `update`, `set`, `clear`... - won't feel sufficient.

The general purpose `do` can help with flexibility: it takes a callback of `(leafState, treeState) => newLeafState`.

```ts
const pizzaShopState = {
  stock: {
    margherita: 10,
    pepperoni: 20
  },
  isOpen: {
    forEatIn: false,
    forTakeOut: true
  }
}

const [reducer, actions] = riduce(pizzaShopState)
const { getState, dispatch } = createStore(reducer)

const squareMargheritaStock = actions.stock.margherita.create.do(leafState => leafState ** 2)

dispatch(squareMargheritaStock)
getState().stock // => { margherita: 100, pepperoni: 20 }

const openIfSurplusStock = actions.isOpen.create.do(
  (leafState, treeState) => {
    const hasEnoughStock = treeState.stock.margherita > 10
    return {
      forEatIn: leafState.forEatIn || hasEnoughStock,
      forTakeOut: leafState.forTakeOut || hasEnoughStock
    }
  }
)

getState().isOpen // => { forEatIn: true, forTakeOut: true }
```

## Add custom reducers
For reusability, sometimes you might want to abstract out some custom reducer logic which can then be executed at arbitrary leaf state.

This can be done in two ways:
1. [Shorthand riducers](#shorthand-riducers)
2. [Longhand riducers](#longhand-riducers)

### Shorthand riducers
Shorthand 'riducers' are functions with the signature `(leafState, action, treeState) => leafState`.

When you pass a dictionary of these to `riduce` as a second argument, it automatically makes a corresponding action creator available.

By default, the action creator will take an optional single argument, that gets passed to your riducer logic as `action.payload`.

(This behaviour can be changed in a [longhand riducer](#longhand-riducers).)

```ts
import riduce, { Action } from 'riduce'
import { createStore } from 'redux'

const restaurantState = {
  tables: [
    { persons: 4, hasOrdered: false, hasPaid: false },
    { persons: 3, hasOrdered: true, hasPaid: false }
  ],
  stock: {
    ramen: {
      beef: 5,
      veg: 2
    },
    sushi: {
      nigiri: 10,
      sashimi: 4
    }
  }
}

/*
 *  Note: I'm typing in a slightly unorthodox way
 *    in the hope that this is more friendly for
 *    non-TypeScript users.
 * 
 *  (I suggest explicitly typing state.)
 */
type Table = typeof restaurantState['tables'][0]

const finishTable = (tableState: Table) => ({
  ...tableState,
  hasOrdered: true,
  hasPaid: true
})

/*
 *  Take an object with number values, and decrease each
 *    value by a given argument (the action payload).
 */
const decreaseValuesBy = (leafState: Record<string, number>, action: Action<number>) => {
  const keys = Object.keys(leafState)
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: leafState[key] - action.payload
  }), {})
}

const [reducer, actions] = riduce(restaurantState, {
  finishTable,
  decreaseValuesBy
})

const { getState, dispatch } = createStore(reducer)

dispatch(actions.tables[0].create.finishTable())
getState().tables[0] // => { persons: 4, haveOrdered: true, havePaid: true }

dispatch(actions.tables[1].create.finishTable())
getState().tables[1] // => { persons: 3, haveOrdered: true, havePaid: true }

// ❌ TypeError: (ts 2339) Property 'finishTable' does not exist on type...
actions.stock.ramen.create.finishTable()

// By default, the first argument passed becomes action.payload
dispatch(actions.stock.ramen.create.decreaseValuesBy(1))
getState().stock.ramen // => { beef: 4, veg: 1 }

dispatch(actions.stock.sushi.create.decreaseValuesBy(4))
getState().stock.sushi // => { nigiri: 6, sashimi: 0 }

// ❌ TypeError: (ts 2339) Property 'decreaseValuesBy' does not exist on type...
actions.tables.create.decreaseValuesBy()
```

### Longhand riducers
Longhand riducer definitions benefit from being more strongly typed.

```ts
import riduce, { Riducer } from 'riduce'
import { createStore } from 'redux'

const bookstoreState = {
  books: {
    9780007925568: {
      title: 'Moby Dick',
      authorName: 'Herman Melville',
      stock: 7
    },
    9780486280615: {
      title: 'The Adventures of Huckleberry Finn',
      authorName: 'Mark Twain',
      stock: 10
    },
    9780764502231: {
      title: 'JavaScript for Dummies',
      authorName: 'Emily A. Vander Veer',
      stock: 5
    }
  },
  visitor: {
    count: 2,
    guestbook: []
  }
}

type BookstoreState = typeof bookstoreState

interface BookReview {
  id: keyof BookstoreState['books'],
  stars: number,
  comment?: string
}

const addBookReviews: Riducer<{
  treeState: BookstoreState,
  leafState: string[],
  args: BookReview[],
  payload: BookReview[]
}> = {
  // pass all arguments through as payload
  argsToPayload: (...reviews) => reviews,

  // push into the string[] a formatted review for each book
  reducer: (leafState, { payload: reviews = [] }, treeState) => {
    return reviews.reduce((acc, { stars, id, comment = '' }) => ([
      ...acc,
      `${stars} stars for ${treeState.books[id].title}! ${comment}`
    ]), leafState)
  }
}

const [reducer, actions] = riduce(bookstoreState, { addBookReviews })

const { getState, dispatch } = createStore(reducer)

// ❌ TypeError: (ts 2339) Property 'addBookReviews' does not exist on type...
actions.create.addBookReviews([])

// ❌ TypeError: (ts 2332) Type 'string' is not assignable to type '9780007925568 | 9780486280615 | 9780764502231'
actions.visitor.guestbook.create.addBookReviews(
  { id: '9780007925568', stars: 4.5 }
)

dispatch(actions.visitor.guestbook.create.addBookReviews(
  { id: 9780007925568, stars: 4.5 },
  { id: 9780764502231, stars: 5, comment: 'so great!!' }
)

getState().visitor.guestbook
/*
[
  '4.5 stars for Moby Dick! ',
  '5 stars for JavaScript for Dummies! so great!!'
]
*/
```

### Control action types
Any time you are calling `create`, you can pass an optional string argument to it. This will be the `type` of any resulting action that gets created. (The `riduce` reducer will still deal with it in the same way.)

If you are using `bundle`, you can pass a second argument of a string to control the type instead.

```ts
import riduce, { bundle } from 'riduce'
import { createStore } from 'redux'

const initialState = {
  counter: 0,
  nums: [4]
}

const double = (leafState: number) => 2 * leafState

const [reducer, actions] = riduce(initialState, { double })
const { getState, dispatch } = createStore(reducer)

const incrementCounter = actions.counter.create('INCREMENTED_COUNTER').increment(5)
incrementCounter.type // => 'INCREMENTED_COUNTER'

dispatch(incrementCounter)
getState().counter // => 5

const doubleCounter = actions.counter.create('DOUBLED_COUNTER').double()
doubleCounter.type // => 'DOUBLED_COUNTER'

dispatch(doubleCounter)
getState().counter // => 10

const storeCountThenDouble = bundle([
  actions.nums.create.do((leafState, treeState) => [...leafState, treeState.counter]),
  doubleCounter // bundle accepts any Riduce actions
], 'STORED_AND_DOUBLED')

storeCountThenDouble.type // => 'STORED AND DOUBLED'
dispatch(storeCountThenDouble)
getState() // => { counter: 20, nums: [4, 10] }

```

## Get started
You may wish to check out the following:
- [Riduce with `useReducer`: CodeSandbox demo](https://codesandbox.io/s/riduce-example-madlibs-for-developers-njo9t)
- [Riduce with Redux: Repl.it demo](https://repl.it/@richardcrng/Riduce-with-Redux)

The basic usage of riduce is documented

Have fun adding it to your project!

```bash
npm install riduce
```