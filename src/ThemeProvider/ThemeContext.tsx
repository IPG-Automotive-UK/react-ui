import React from "react";

/**
 * Context for theme
 */
export default React.createContext<
  readonly [string, React.Dispatch<React.SetStateAction<string>>]
>(["light", () => {}]);
