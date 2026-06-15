export const enterLocaleOrCountryErrorMessage =
  data.isValid === "SHORT" || data.isValid === "EMPTY"
    ? `Please enter either a country code (usually 2-3 digits) or a valid locale string`
    : data.isValid === "LONG"
      ? `The string you entered is too long. Please enter either a country code (usually 2-3 digits) or a valid locale string (2 characters, an underscore, followed by 2-3 characters)`
      : data.isValid === "NONCHARACTER"
        ? `Please enter only alpha numeric characters, underscore, or hyphen`
        : `There is an error in your input`;
