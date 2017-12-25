# Viewport Manager
`viewport-manager` is a lighweight and customizable viewport manager that helps you with you `resize` events. It creates a collection of callbacks to be called only when the viewport really changes.

## Why
Sometimes we don't want to show a module at a specific viewport only. Yes, we can do it via CSS using `@media` and `display: none`; But let's say that when that component mounts it fires async functions or dispatches actions. We would like to prevent this and that's where viewport-manager comes in handy.

## Install
```npm i --save viewport-manager```

## Initiate
in: `app/viewport-manager.js`

```
// Import the module from node_modules.
import ViewportManager from 'viewport-manager';

// declare sizes
const breakpoints = {
  mobile: {
    max: 768,
  },
  tablet: {
    min: 768,
    max: 1024,
  },
  desktop: {
    min: 1024,
  },
};

const delay = 0; // if delay !== 0 a debounce will be applied to all listeners.

// export an instance of the viewport manager and we set some options.
export default new ViewportManager({ breakpoints, delay });

```

## Use it
We want to import the instance created and configured before. In this example I'm using React.

in `app/components/Foo/foo.jsx`:

```
// include the instance declared in the previous file.
import Viewport from 'app/viewport-manager.js';

class Foo extends React.Component {
  [... other methods ...]

  componentDidMount() {
    Viewport.listen(this.handleViewportChange)
  }

  componentWillUnmount() {
    Viewport.unlisten(this.handleViewportChange)
  }

  handleViewportChange(viewport) {
    console.log(`the viewport changed: ${viewport}`);

    // we trigger a render only for this component
    this.setState({
      viewport,
    });
  }
}
```

## Options
type: `object`.

To configure your `viewport-manager` you can pass options when you create an instance.
```const new ViewportManager(options)```

#### options.breakpoints
type: `object`.

`breakpoints` should be an object with all your breakpoints rules. Let's have a look to an example:

```
customKeyName = `custom key name`;
const breakpoints = {
  mobile: {
    // min will automatically be 0
    max: 640
  },
  tablet: {
    min: 640,
    max: 1024,
  },
  // the key name is what the get() method returns and it can be custom if you want.
  // this will be: breakpoints['custom key name 11']
  [`${customKeyName} 11`]: {
    min: 1024
    // max will automatically be 10000
  }
};
```

#### options.delay
type: `number`.
if the value is true (different from 0), then all methods will have a delay of `delay` milliseconds.
```const new ViewportManager({ breakpoints, delay: 100 })```

# Api
#### Instance.listen(fn)
type: `function`.

`listen()` requires one parameter, the function to be called when the viewport changes. This methos adds the function inside a global array of callbacks.

#### Instance.unlisten(fn)
type: `function`.

`unlisten()` requires one parameter the function previously passed in the `listen()` method. This will remove the callback from the collection and it will not be called anymore.

#### Instance.get()
returns the current viewport. Use this method before the component mounts.