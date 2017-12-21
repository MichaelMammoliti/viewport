class ViewportManager {
  constructor(options) {
    this.options = { ...options };

    this.initialise();
  }

  // Initialise
  // =============================================
  initialise() {
    const { delay, breakpoints } = this.options;

    if (!breakpoints) {
      console.warn(`It seems you didn't set any breakpoint. Check "options.breakpoints".`);

      return;
    }

    this.breakpoints = this.getBreakpoints(breakpoints);
    this.breakpointKeys = Object.keys(this.breakpoints);
    this.listenerCollection = [];

    window.addEventListener('resize', () => {
      if (!delay) return this.handleWindowResize();

      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => this.handleWindowResize(), delay);
    });
  }

  // Events
  // =============================================
  handleWindowResize() {
    const currentViewport = this.getViewport();

    // if we don't have listeners, we return.
    if (!this.listenerCollection.length) return;

    // if same viewport we don't want to fire the functions
    if (this.activeViewport === currentViewport) return;

    // we set the viewport
    this.activeViewport = currentViewport;

    // we call all listeners.
    this.listenerCollection.forEach(listenerFn => listenerFn(this.activeViewport));
  }

  // Getters
  // =============================================
  getViewport() {
    return this.breakpointKeys.reduce((acc, breakpointLimit) => {
      if (window.matchMedia(this.breakpoints[breakpointLimit]).matches) return breakpointLimit;

      return acc;
    }, '');
  }

  getMediaQueryString({ min = 0, max = 10000 }) {
    return `(min-width: ${min}px) and (max-width: ${max}px)`;
  }

  getBreakpoints(breakpoints) {
    return Object.keys(breakpoints).reduce((acc, size) => ({
      ...acc,
      [size]: this.getMediaQueryString(breakpoints[size]),
    }), {});
  }

  // Listeners
  // =============================================
  listen(listenerFn) {
    this.listenerCollection.push(listenerFn);
  }

  unlisten(listenerFn) {
    const index = this.listenerCollection.indexOf(listenerFn);

    if (index === -1) return;

    this.listenerCollection.splice(index, 0);
  }

  // shortcuts
  get() {
    return this.getViewport();
  }
}

export default ViewportManager;
