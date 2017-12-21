# Viewport
A customizable viewport manager

# Initiate
in `app/viewport-manage.js`
```
// Import the module.
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

const delay = 0; // if 0 no delay will be called

// export an instance of the viewport manager and we set some options.
export default new ViewportManager({ sizes, delay });

```

# Use it
in `app/components/Foo`

```
// include the instance declared in the previous file.
import ViewportManager from 'app/viewport-manager';

class Foo extends React.Component {
  // on mount
  componentDidMount() {
    Viewport.listen(this.handleLog)
  }

  // on did mount
  componentWillUnmount() {
    Viewport.unlisten(this.handleLog)
  }
  
  // the listener
  handleLog(viewport) {
    console.log(`the viewport is ${viewport}`);
  }
}
```
