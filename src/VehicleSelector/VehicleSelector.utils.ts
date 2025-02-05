/**
 * Creates a default vehicle record.
 *
 * @param projectCode - The project code.
 * @param modelYear - The model year.
 * @param variant - The variant (default is an empty string).
 * @param gate - The gate (default is an empty string).
 * @returns A new vehicle record.
 */
export const createVehicleRecord = (
  projectCode: string,
  modelYear: string,
  variant: string = "",
  gate: string = ""
) => {
  return { _id: "", gate, modelYear, projectCode, variant };
};

/**
 * Determines if an auto‑selection should occur.
 *
 * @param selectedValue - The currently selected field value.
 * @param availableOptions - The list of available options.
 * @param userCleared - Whether the user has manually cleared the field.
 * @returns True if auto‑selection should happen.
 */
export const shouldAutoSelect = (
  selectedValue: string,
  availableOptions: string[],
  userCleared: boolean
): boolean => {
  return selectedValue === "" && availableOptions.length === 1 && !userCleared;
};

/**
 * Filters vehicles by project, model year, and (optionally) variant.
 *
 * @param variants - The complete list of vehicle variants.
 * @param projectCode - The selected project code.
 * @param modelYear - The selected model year.
 * @param variant - (Optional) The variant to filter on.
 * @returns An array of vehicle records that match the criteria.
 */
export const filterVehicles = (
  variants: Array<{
    _id: string;
    projectCode: string;
    modelYear: string;
    variant: string;
    gate?: string;
  }>,
  projectCode: string,
  modelYear: string,
  variant?: string
) => {
  return variants.filter(
    v =>
      v.projectCode === projectCode &&
      v.modelYear === modelYear &&
      (variant ? v.variant === variant : true)
  );
};
