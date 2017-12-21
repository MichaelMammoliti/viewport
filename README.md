# Viewport
A customizable viewport manager

# Initiate
```
// in viewport.js
// Initilize the viewport.
import ViewportManager from 'some/dir/viewport-manager';

// declare sizes
const sizes = {
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

// export an instance of the viewport manager.
export default new ViewportManager({ sizes });

```

# Use it
```
// include the instance declared in the previous file.
import Viewport from 'viewport';

// use it somewhere
window.addEventListener('resize', () => {
  const viewport = Viewport.get();

  console.log(viewport);
})
```
