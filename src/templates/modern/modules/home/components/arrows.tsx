import React from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

interface ArrowProps {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}

function Arrow({ children, disabled, onClick }: ArrowProps): JSX.Element {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        right: '1%',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible));
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (!isNaN(visibleItemsWithoutSeparators.length) && isFirstItemVisible !== undefined) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !(!isNaN(visibleItemsWithoutSeparators.length) && isLastItemVisible !== undefined) && isLastItemVisible,
  );
  React.useEffect(() => {
    if (!isNaN(visibleItemsWithoutSeparators.length) && isLastItemVisible !== undefined) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}
