import React from 'react';

const preventDefault = (ev: WheelEvent) => {
  // if (ev.preventDefault) {

  // }

  ev.preventDefault();
  // ev.returnValue = false;
};

const enableBodyScroll = () => {
  document !== null && document.removeEventListener('wheel', preventDefault, false);
};
const disableBodyScroll = () => {
  document !== null &&
    document.addEventListener('wheel', preventDefault, {
      passive: false,
    });
};

function usePreventBodyScroll() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    hidden ? disableBodyScroll() : enableBodyScroll();

    return enableBodyScroll;
  }, [hidden]);

  const disableScroll = React.useCallback(() => setHidden(true), []);
  const enableScroll = React.useCallback(() => setHidden(false), []);
  return { disableScroll, enableScroll };
}

export default usePreventBodyScroll;
