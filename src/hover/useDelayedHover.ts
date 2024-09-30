import { PopupState, bindHover } from "material-ui-popup-state/hooks";
import { useCallback, useRef } from "react";

/**
 * Custom hook that provides delayed hover functionality for a popup.
 *
 * @param {PopupState} popupState - The popup state provided by material-ui-popup-state.
 * @param {number} delayMs - The delay in milliseconds before the popup is triggered on hover.
 * @returns {object} An object containing event handlers for hover and touch interactions.
 */
export function useDelayedHover(popupState: PopupState, delayMs = 200) {
  // Destructuring hover-related event handlers from material-ui-popup-state's bindHover.
  const { onTouchStart, onMouseOver, onMouseLeave, ...hoverAriaProps } =
    bindHover(popupState);

  // Ref to store the timeout ID, used to manage delayed hover behavior.
  const timeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handles the delayed mouse over event.
   * Triggers the popup after the specified delay.
   */
  const delayedMouseOver = useCallback(
    (e: React.MouseEvent) => {
      // Clear any existing timeout to prevent unintended popups.
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      // material-ui-popup-state's event handler uses currentTarget to set the anchorEl, but
      // currentTarget is only defined while the initial event is firing. Save the original
      // and set it again before calling the delayed event handler
      const { currentTarget } = e;

      // Set a new timeout to trigger the hover event after the delay.
      timeout.current = setTimeout(() => {
        e.currentTarget = currentTarget;
        onMouseOver(e);
      }, delayMs);
    },
    [onMouseOver, delayMs]
  );

  /**
   * Handles the mouse leave event.
   * Cancels any delayed popup trigger and closes the popup.
   */
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      onMouseLeave(e);
    },
    [onMouseLeave]
  );

  // Return the event handlers that can be applied to an element.
  return {
    onMouseLeave: handleMouseLeave,
    onMouseOver: delayedMouseOver,
    onTouchStart,
    ...hoverAriaProps
  };
}
