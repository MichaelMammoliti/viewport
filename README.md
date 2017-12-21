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

const delay = 0; // if delay !== 0 we will debounce the call.

// export an instance of the viewport manager and we set some options.
export default new ViewportManager({ breakpoints, delay });

```

# Use it
in `app/components/Foo`

```
// include the instance declared in the previous file.
import ViewportManager from 'app/viewport-manager';

class Foo extends React.Component {
  
  [...]
  
  componentDidMount() {
    Viewport.listen(this.handleLog)
  }

  componentWillUnmount() {
    Viewport.unlisten(this.handleLog)
  }
  
  handleLog(viewport) {
    console.log(`the viewport is ${viewport}`);
     
    // we trigger a render only for this component
    this.setState({
      viewport,
    });
  }
  
  [...]
  
}
```
