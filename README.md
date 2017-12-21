# Viewport
A customizable viewport manager

# Initiate
```
// in viewport.js
// Initilize the viewport.
import ViewportManager from 'some/dir/viewport-manager';

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

const delay = 0; // if 0 no delay will be called

// export an instance of the viewport manager and we set some options.
export default new ViewportManager({ sizes, delay });

```

# Use it
```
// include the instance declared in the previous file.
import Viewport from 'viewport';

class Foo extends React.Component {
  // the listener
  handleLog(viewport) {
    console.log(`the viewport is ${viewport}`);
  }

  // on mount
  componentDidMount() {
    Viewport.listen(this.handleLog)
  }

  // on did mount
  componentWillUnmount() {
    Viewport.unlisten(this.handleLogfn)
  }
}
```
