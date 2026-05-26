import { useState, createContext } from "react";
import {
  LocaleList,
  CountryCodes,
  CountryList,
} from "../helpers/localeMaping.js";

export const McToolsContext = createContext({
  compareLocales: {},
  localeList: {},
  countryCode: {},
  urlGen: {},
  toolTip: "",
  isToolTip: false,
  errorType: "",
  handleToolTipClick: () => {},
  handleToolTipClose: () => {},
  handleCompareLocaleChange: () => {},
  handleGetCompareLocales: () => {},
  handleClearLocaleListInput: () => {},
  handleOnFocusLocaleList: () => {},
  handleResetCompareLocales: () => {},
  handleGetLocaleGeneratorList: () => {},
  handleLocaleGeneratorOnPaste: () => {},
  handleLocaleGeneratorOnChange: () => {},
  handleLocaleGeneratorOnFocus: () => {},
  handleResetLocaleGeneratorListInput: () => {},
  handleGetCountryCodeOnChange: () => {},
  handleGetCountryCode: () => {},
  handleGetCountryCodeOnFocus: () => {},
  handleUrlGeneratorOnChange: () => {},
  handleGetUrlGenerator: () => {},
  handleGetUrlGeneratorOnFocus: () => {},
  setUrlGeneratorVisited: () => {},
});

export default function McToolsContextProvider({ children }) {
  const [masterTools, setMasterTools] = useState({
    compareLocales: {
      firstInput: "",
      firstInputArr: [],
      secondInput: "",
      secondInputArr: [],
      matchingLocales: [],
      fieldOneNotTwo: [],
      fieldTwoNotOne: [],
      isComparisonGood: false,
      isError: false,
      errorType: undefined,
      errorLocation: undefined,
    },
    localeList: {
      firstInput: "",
      firstInputArr: [],
      secondInput: "",
      secondInputArr: [],
      localesWithContentArr: [],
      isLocaleListGenerate: false,
      isError: false,
      errorType: undefined,
      errorLocation: undefined,
    },
    countryCode: {
      value: undefined,
      input: undefined,
      result: undefined,
      isValid: undefined,
      resultType: undefined,
      showResult: false,
      isError: false,
    },
    urlGen: {
      url: "",
      input: "",
      trimmedArr: [],
      trimmedArrCount: 0,
      localesCount: undefined,
      urlArr: [],
      showUrlList: false,
      isVisited: [],
      isError: false,
      errorLocation: undefined,
      errorType: undefined,
    },
    isToolTip: false,
    toolTip: "",
    errorType: undefined,
  });

  function handleToolTipClick(type) {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        toolTip: type,
        isToolTip: true,
      };
    });
  }

  function handleToolTipClose(type) {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        toolTip: "",
        isToolTip: false,
      };
    });
  }

  // ######
  // ##  COMPARE LOCALES
  // ######

  function handleCompareLocaleChange(e) {
    const arrayName = e.target.name;
    const value = e.target.value;
    const newArray = value === "" ? [] : value.replace(/\s+/g, "").split(",");
    setMasterTools((prevState) => {
      return {
        ...prevState,
        compareLocales: {
          ...prevState.compareLocales,
          [arrayName]: value,
          [arrayName + "Arr"]: newArray,
        },
      };
    });
  }

  function handleGetCompareLocales() {
    const firstInput = [...masterTools.compareLocales.firstInputArr];
    const secondInput = [...masterTools.compareLocales.secondInputArr];
    const localesInBoth = [];
    const inOneNotTwo = [];
    const AlsoInBoth = [];
    const inTwoNotOne = [];
    if (!firstInput.length && !secondInput.length) {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          compareLocales: {
            ...prevState.compareLocales,
            isComparisonGood: false,
            isError: true,
            errorType: "noContent",
            errorLocation: "both",
          },
        };
      });
    } else if (!firstInput.length) {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          compareLocales: {
            ...prevState.compareLocales,
            isComparisonGood: false,
            isError: true,
            errorType: "noContent",
            errorLocation: "firstInput",
          },
        };
      });
    } else if (!secondInput.length) {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          compareLocales: {
            ...prevState.compareLocales,
            isComparisonGood: false,
            isError: true,
            errorType: "noContent",
            errorLocation: "secondInput",
          },
        };
      });
    } else {
      firstInput.map((locale, i) => {
        if (secondInput.includes(locale)) {
          localesInBoth.push(locale);
        } else {
          inOneNotTwo.push(locale);
        }
      });
      secondInput.map((locale, i) => {
        if (firstInput.includes(locale)) {
          AlsoInBoth.push(locale);
        } else {
          inTwoNotOne.push(locale);
        }
      });
      setMasterTools((prevState) => {
        return {
          ...prevState,
          compareLocales: {
            ...prevState.compareLocales,
            isComparisonGood: true,
            matchingLocales: localesInBoth,
            fieldOneNotTwo: inOneNotTwo,
            fieldTwoNotOne: inTwoNotOne,
          },
        };
      });
    }
  }

  function handleResetCompareLocales() {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        compareLocales: {
          ...prevState.compareLocales,
          firstInput: "",
          firstInputArr: [],
          secondInput: "",
          secondInputArr: [],
          matchingLocales: [],
          fieldOneNotTwo: [],
          fieldTwoNotOne: [],
          isComparisonGood: false,
          isError: false,
          errorType: undefined,
          errorLocation: undefined,
        },
      };
    });
  }

  // ######
  // ##  LOCALE GENERATOR
  // ######

  function handleClearLocaleListInput(e) {
    const target = e.target.dataset.input;
    setMasterTools((prevState) => {
      return {
        ...prevState,
        compareLocales: {
          ...prevState.compareLocales,
          [target]: [],
          [target + `Arr`]: [],
          matchingLocales: [],
          isComparisonGood: false,
          isError: false,
          errorType: undefined,
          errorLocation: undefined,
        },
      };
    });
  }

  function handleOnFocusLocaleList(e) {
    if (masterTools.compareLocales.isError) {
      const target = e.target.name;
      const isError =
        masterTools.compareLocales.errorLocation === "both" ||
        masterTools.compareLocales.errorLocation != target
          ? true
          : false;
      const errorType =
        masterTools.compareLocales.errorLocation === "both" ||
        masterTools.compareLocales.errorLocation != target
          ? masterTools.compareLocales.errorType
          : undefined;
      const errorLocation =
        masterTools.compareLocales.errorLocation === "both" &&
        target === "firstInput"
          ? "secondInput"
          : masterTools.compareLocales.errorLocation === "both" &&
              target === "secondInput"
            ? "firstInput"
            : masterTools.compareLocales.errorLocation != target
              ? masterTools.compareLocales.errorLocation
              : undefined;
      setMasterTools((prevState) => {
        return {
          ...prevState,
          compareLocales: {
            ...prevState.compareLocales,
            isComparisonGood: false,
            isError: isError,
            errorType: errorType,
            errorLocation: errorLocation,
          },
        };
      });
    }
  }

  // ######
  // ##  LOCALE GENERATOR
  // ######

  // Get Content change Locale List
  function handleLocaleGeneratorOnPaste(e) {
    e.preventDefault();
    const value = e.clipboardData?.getData("text");
    const inputTab = e.target;
    console.log(`inputTab =`, inputTab);
    const arrayName = e.target.name;

    console.log(`handlePaste firing =`, value);
    console.log(`arrayName = ${arrayName}`);
    const newArr =
      arrayName === "firstInput"
        ? value
            .replace(/^\n/, "") // remove leading new line
            .replaceAll(" ", "") // remove spaces
            .replace(/\n*$/, "") // remove trailing newline from end
            .replace(/,\s*$/, "") //  remove trailing comma and/or followed by whitespace from end
            .replace(/\t/g, ",") // replace tabs with comma
            .replace(/\n+/g, ",") // replace one or more newline characters with comma
            .split(",") // create new array
        : value
            .replace(/\n$/, "")
            .replace(/(\r\n|\n|\r)/g, ",")
            .split(",");
    const newValue = newArr; // TODO - why ? is needed? a const for a const

    setMasterTools((prevState) => {
      return {
        ...prevState,
        localeList: {
          ...prevState.localeList,
          [arrayName]: value,
          [arrayName + "Arr"]: newValue,
        },
      };
    });
  }

  function handleGetLocaleGeneratorList() {
    const len1 = masterTools.localeList.firstInputArr.length;
    const len2 = masterTools.localeList.secondInputArr.length;
    if (len1 === 0 || len2 === 0) {
      console.log(`generateList error -  not equal`);
      const errorLocation =
        len1 === 0 && len2 === 0
          ? "BOTH"
          : len1 === 0
            ? "firstInput"
            : "secondInput";
      setMasterTools((prevState) => {
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            isError: true,
            errorType: "localeListInputIsEmpty",
            errorLocation: errorLocation,
          },
        };
      });
    } else if (len1 === len2) {
      console.log(`localeList array lengths ==`);
      const indexArr = [];
      masterTools.localeList.secondInputArr.map((indicator, i) => {
        if (indicator === "") {
          indexArr.push(i);
        }
      });
      const localeArray = masterTools.localeList.firstInputArr.filter(
        (value, index) => {
          return !indexArr.includes(index);
        },
      );
      setMasterTools((prevState) => {
        console.log(`localeList GTG & localeArray =`, localeArray);
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            localesWithContentArr: [...localeArray],
            isLocaleListGenerate: true,
          },
        };
      });
    } else {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          isError: true,
          errorType: "localeListInputNotEqual",
          errorLocation: "BOTH",
        };
      });
    }
  }

  function handleLocaleGeneratorOnChange(e) {
    const value = e.target.value;
    const target = e.target.dataset.type;
    const newValue = value === "" ? [] : value.split(", ");
    console.log(`handleLocaleGeneratorOnChange firing`);
    console.log(`value = ${value}`);
    console.log(`target = ${target}`);
    console.log(`newValue = ${newValue}`);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        localeList: {
          ...prevState.localeList,
          [target + "Arr"]: newValue,
        },
      };
    });
  }

  function handleLocaleGeneratorOnFocus(e) {
    const target = e.target.dataset.type;
    const value = target === "firstInput" ? "secondInput" : "firstInput";
    setMasterTools((prevState) => {
      if (prevState.localeList.errorLocation === "BOTH") {
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            errorLocation: value,
          },
        };
      } else if (prevState.localeList.errorLocation === target) {
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            isError: false,
            errorLocation: undefined,
            errorType: undefined,
          },
        };
      } else {
        console.log(`clean onFocus`);
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            // isLocaleListGenerate: false,
            // isError: false,
            // errorLocation: undefined,
            // errorType: undefined,
          },
        };
      }
    });
  }

  function handleResetLocaleGeneratorListInput() {
    console.log(`handleResetLocaleGeneratorListInput firing`);
    setMasterTools((prevState) => {
      console.log(`handleResetLocaleGeneratorListInput firing`);
      return {
        ...prevState,
        errorType: undefined,
        localeList: {
          ...prevState.localeList,
          firstInput: "",
          firstInputArr: [],
          secondInput: "",
          secondInputArr: [],
          localesWithContentArr: [],
          isError: false,
          errorType: undefined,
        },
      };
    });
  }

  // ######
  // ##  GET COUNTRY CODE
  // ######

  const Locales = [...LocaleList].map((locale) => {
    return locale.toLocaleLowerCase();
  });
  const Countries = [...CountryCodes].map((country) => {
    return country.toLocaleLowerCase();
  });

  function handleGetCountryCodeOnChange(e) {
    const value = e.target.value;
    console.log(`handleCountryCodeOnChange firing with value`, value);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        countryCode: {
          ...prevState.countryCode,
          value: value,
        },
      };
    });
  }

  function handleGetCountryCode() {
    const exp = new RegExp(/^[a-zA-Z0-9_-]+$/);
    const value = masterTools.countryCode.value;
    console.log(`handleGetCountryCode and value =`, value);
    const valid = exp.test(value);

    if (value === undefined) {
      // checks for bad or no input
      console.log(`value undefined`);
      setMasterTools((prevState) => {
        return {
          ...prevState,
          countryCode: {
            ...prevState.countryCode,
            isError: true,
            isValid: "EMPTY",
          },
        };
      });
    } else if (!valid) {
      console.log(`value not noncharacter`);
      setMasterTools((prevState) => {
        return {
          ...prevState,
          countryCode: {
            ...prevState.countryCode,
            isError: true,
            isValid: "NONCHARACTER",
          },
        };
      });
    } else {
      // input is good and check for length and result
      if (value?.length < 2) {
        console.log(`value short`);
        setMasterTools((prevState) => {
          return {
            ...prevState,
            countryCode: {
              ...prevState.countryCode,
              isError: true,
              isValid: "SHORT",
            },
          };
        });
      } else if (value?.length > 6) {
        setMasterTools((prevState) => {
          return {
            ...prevState,
            countryCode: {
              ...prevState.countryCode,
              isError: true,
              isValid: "LONG",
            },
          };
        });
      } else {
        // input length is good
        const isLocale = value?.includes("_");
        if (isLocale) {
          const index = Locales.indexOf(value.toLowerCase());
          if (index < 0) {
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  isValid: true,
                  resultType: "LOCALENOTFOUND",
                  showResult: true,
                },
              };
            });
          } else {
            const countryCode = CountryCodes[index];
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  result: countryCode,
                  isValid: true,
                  resultType: "COUNTRYCODE",
                  showResult: true,
                },
              };
            });
          }
        } else {
          const index = Countries.indexOf(value?.toLowerCase());
          if (index < 0) {
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  isValid: true,
                  resultType: "COUNTRYNOTFOUND",
                  showResult: true,
                },
              };
            });
          } else {
            const locale = LocaleList[index];
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  result: locale,
                  isValid: true,
                  resultType: "LOCALECODE",
                  showResult: true,
                },
              };
            });
          }
        }
      }
    }
  }
  function handleGetCountryCodeOnFocus() {
    console.log(`handleGetCountryCodeOnFocus firing`);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        countryCode: {
          value: undefined,
          isValid: undefined,
          resultType: undefined,
          showResult: false,
          isError: false,
          resultType: undefined,
        },
      };
    });
  }

  // ######
  // ##   URL GENERATOR
  // ######

  function handleUrlGeneratorOnChange(e) {
    const value = e.target.value;
    const type = e.target.dataset.type;
    console.log(
      `handleUrlGeneratorOnChange firing with value = ${type} & ${value}`,
      e.target,
    );
    if (type === "URL") {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          urlGen: {
            ...prevState.urlGen,
            [e.target.name]: value.replace(/\s+/g, ""),
          },
        };
      });
    } else if (type === "LOCALE") {
      const newArr = value
        .replace(/\n+/g, ",")
        .replace(/\t/g, ",")
        .replace(/,\s*$/, "")
        .split(",");
      const trimmedArr = value === "" ? [] : newArr.map((item) => item.trim());
      console.log(`trimmedArr =`, trimmedArr);
      setMasterTools((prevState) => {
        return {
          ...prevState,
          urlGen: {
            ...prevState.urlGen,
            input: value,
            trimmedArr: [...trimmedArr],
            trimmedArrCount: trimmedArr.length, // TODO - do i need to keep lenght in state?
          },
        };
      });
    }
  }

  function handleGetUrlGenerator() {
    const localesArr = [...masterTools.urlGen.trimmedArr];
    function urlTest(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }
    const isValidUrl = urlTest(masterTools.urlGen.url);
    const hasError = !isValidUrl || localesArr <= 0 ? true : false;
    const errorLocation = !isValidUrl
      ? localesArr <= 0
        ? "BOTH"
        : "URL"
      : localesArr <= 0
        ? "LOCALE"
        : undefined;

    if (isValidUrl && !hasError) {
      const urlParams = [...CountryList];
      const url = new URL(masterTools.urlGen.url);
      const protocol = url.protocol;
      const hostname = url.hostname;
      const pathname = url.pathname;
      const param = url.search;
      const testingUrls = [];
      localesArr.map((locale, i) => {
        const index = LocaleList.indexOf(locale);
        const urlParam = urlParams[index];
        const previewUrl =
          locale === "zh_CN"
            ? protocol + "//" + hostname + ".cn" + pathname + param
            : protocol + "//" + hostname + urlParam + pathname + param;
        testingUrls.push(previewUrl);
      });
      setMasterTools((prevState) => {
        const setShow = prevState.urlGen.showUrlList;
        return {
          ...prevState,
          urlGen: {
            ...prevState.urlGen,
            urlArr: [...testingUrls],
            showUrlList: true,
            // showUrlList: !setShow,
            isVisited: [],
            isError: hasError,
            errorLocation: errorLocation,
          },
        };
      });
    } else {
      setMasterTools((prevState) => {
        const setShow = prevState.urlGen.showUrlList;
        return {
          ...prevState,
          urlGen: {
            ...prevState.urlGen,
            showUrlList: false,
            isError: hasError,
            errorLocation: errorLocation,
          },
        };
      });
    }
  }

  function handleGetUrlGeneratorOnFocus(e) {
    console.log(`handleGetCountryCodeOnFocus firing`);
    const location = e.target.dataset.type;
    console.log(`location clicked = ${location}`);
    setMasterTools((prevState) => {
      const prevLocation = prevState.urlGen.errorLocation;
      const errorLocation =
        prevLocation === "BOTH"
          ? location === "URL"
            ? "LOCALE"
            : "URL"
          : prevLocation === location
            ? undefined
            : prevLocation;
      // const hasError =
      //   prevLocation === "BOTH"
      //     ? location === "URL"
      //       ? "LOCALE"
      //       : "URL"
      //     : location === "LOCALE"
      //       ? location === prevLocation
      //         ? false
      //         : true
      //       : location === "URL"
      //         ? location === prevLocation
      //           ? false
      //           : true
      //         : true;
      const hasError =
        prevLocation === "BOTH"
          ? true
          : prevLocation === location
            ? false
            : true;
      // const hasError =
      //   prevLocation === location
      //     ? false
      //     : prevLocation === "BOTH"
      //       ? true
      //       : false;
      // const hasError = prevLocation === "BOTH" ? true : false;
      console.log(`prevLocation = ${prevLocation}`);
      console.log(`errorLocation = ${errorLocation}`);
      console.log(`hasError = ${hasError}`);
      return {
        ...prevState,
        urlGen: {
          ...prevState.urlGen,
          isError: hasError,
          errorLocation: errorLocation,
          //errorType: undefined,
        },
      };
    });
  }

  function setUrlGeneratorVisited(i) {
    setMasterTools((prevState) => {
      const visitedArr = [...prevState.urlGen.isVisited];
      visitedArr.push(i);
      return {
        ...prevState,
        urlGen: {
          ...prevState.urlGen,
          isVisited: [...visitedArr],
        },
      };
    });
  }

  const ctxValue = {
    compareLocales: masterTools.compareLocales,
    localeList: masterTools.localeList,
    countryCode: masterTools.countryCode,
    urlGen: masterTools.urlGen,
    toolTip: masterTools.toolTip,
    isToolTip: masterTools.isToolTip,
    errorType: masterTools.errorType,
    handleToolTipClick: handleToolTipClick,
    handleToolTipClose: handleToolTipClose,
    handleLocaleGeneratorOnPaste: handleLocaleGeneratorOnPaste,
    handleGetLocaleGeneratorList: handleGetLocaleGeneratorList,
    handleLocaleGeneratorOnChange: handleLocaleGeneratorOnChange,
    handleLocaleGeneratorOnFocus: handleLocaleGeneratorOnFocus,
    handleClearLocaleListInput: handleClearLocaleListInput,
    handleOnFocusLocaleList: handleOnFocusLocaleList,
    handleResetCompareLocales: handleResetCompareLocales,
    handleCompareLocaleChange: handleCompareLocaleChange,
    handleGetCountryCodeOnChange: handleGetCountryCodeOnChange,
    handleGetCountryCodeOnFocus: handleGetCountryCodeOnFocus,
    handleGetCompareLocales: handleGetCompareLocales,
    handleResetLocaleGeneratorListInput: handleResetLocaleGeneratorListInput,
    handleGetCountryCode: handleGetCountryCode,
    handleUrlGeneratorOnChange: handleUrlGeneratorOnChange,
    handleGetUrlGenerator: handleGetUrlGenerator,
    handleGetUrlGeneratorOnFocus: handleGetUrlGeneratorOnFocus,
    setUrlGeneratorVisited: setUrlGeneratorVisited,
  };

  return (
    <McToolsContext.Provider value={ctxValue}>
      {children}
    </McToolsContext.Provider>
  );
}
