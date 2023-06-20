// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Mock matchmedia
window.matchMedia = window.matchMedia || function (): MediaQueryList {
  return {
    matches: false,
    addListener: function (): void {
      // do nothing
    },
    removeListener: function (): void {
      // do nothing
    }
  } as Partial<MediaQueryList> as MediaQueryList;
};

// Disable rendering of certain components which have issues running in jsdom
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Ionic = {
  config: {
    _testing: true,
  },
};
