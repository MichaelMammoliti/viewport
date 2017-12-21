class Viewport {
  constructor(options) {
    this.sizes = options.sizes;

    this.breakpoints = this.getBreakpoints();
  }

  getMediaQueryString(size) {
    return `(min-width: ${size.min || 0}px) and (max-width: ${size.max || 10000}px)`;
  }

  getBreakpoints() {
    return Object.keys(this.sizes).reduce((acc, size) => ({
      ...acc,
      [size]: this.getMediaQueryString(sizes[size])
    }), {});
  }

  get() {
    return Object.keys(this.breakpoints).reduce((acc, breakpointLimit) => {
      if (window.matchMedia(this.breakpoints[breakpointLimit]).matches) return breakpointLimit;

      return acc;
    }, '');
  }
}

export default Viewport;
