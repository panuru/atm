# ATM Simulator

A demo of an Automated Teller Machine that accepts imaginary credit cards and gives out imaginary cash.

It uses [Express](http://expressjs.com) and [Webpack dev server](https://github.com/webpack/webpack-dev-server) to run the application, and application itself is using [React](http://reactjs.com/) and [Redux](http://redux.js.org/).

## Installation
Simply run
```
npm install
```
in the root folder.

To run the application:
```
npm start
```
At the moment, there are no tests.

## Implementation notes
An ATM interface is a series of screens each representing a state, and I immediately thought of trying Redux as is seemed the perfect candidate (the task also mentions going back to previous screen/state, and resetting the state from any screen, which is not present in current implementation, but would be easy with current architecture).

Some notes on implementation using Redux:
* Entry point is [app.js](/js/app.js); container component [containers/Atm.js](/js/containers/Atm.js) is connected to the state and dispatches actions; presentation components are stored in [components/](/js/components/) folder.
* [Reducers](/js/reducers) and [actions](/js/actions) are splitted into three entities: _atm_, _card_ and _account_.
* With this separation, account data is requested separately from the card, and it is possible to support cards linked to many accounts (e.g. USD and EUR). Currently, account selection screen is absent and money is "withdrawn" from one primary account.
* To simplify things, checks for card expiry and sufficient funds are missing.
* Data layer is mocked in [utils/dataProvider.js](/js/utils/dataProvider.js) using promises. All data access actions have 1 in 200 chance to fail randomly, imitating faulty hardware.
* There is one error state and it is terminal. User is suggested to wait for a technician to fix the machine (or refresh the page).
* Virtual ATM keyboard is implemented without Redux using [pubsub-js](https://github.com/mroderick/PubSubJS). Having key press events in state doesn't seem right, and keyboard events are always global, so a global event bus fits the task. Native React views that use virtual keyboard have very similar bindings as in [components/PinEnter.js](/js/components/PinEnter.js) `componentDidMount`.

# Next steps, concerns and todos

Next step is to start covering reducers and components with unit tests, possibly using [Jest](https://facebook.github.io/jest/).

[Atm.js](/js/containers/Atm.js) has some maintainability concerns: if more screens are added it could grow uncontrollably. I would try to split it into smaller container views for some sub-sets of the state.
