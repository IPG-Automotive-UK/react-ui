import { PopupState, bindHover } from "material-ui-popup-state/hooks";
import { useCallback, useRef } from "react";

export function useDelayedHover(popupState: PopupState, delayMs = 200) {
  const { onTouchStart, onMouseOver, onMouseLeave, ...hoverAriaProps } =
    bindHover(popupState);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const delayedMouseOver = useCallback(
    (e: React.MouseEvent) => {
      if (timeout.current) clearTimeout(timeout.current);

      // material-ui-popup-state's event handler uses currentTarget to set the anchorEl, but
      // currentTarget is only defined while the initial event is firing. Save the original
      // and set it again before calling the delayed event handler
      const { currentTarget } = e;
      timeout.current = setTimeout(() => {
        e.currentTarget = currentTarget;
        onMouseOver(e);
      }, delayMs);
    },
    [onMouseOver]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (timeout.current) clearTimeout(timeout.current);
      onMouseLeave(e);
    },
    [onMouseLeave]
  );

  return {
    onMouseLeave: handleMouseLeave,
    onMouseOver: delayedMouseOver,
    onTouchStart,
    ...hoverAriaProps
  };
}
