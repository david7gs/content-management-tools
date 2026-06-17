import { useState, createContext, useEffect } from "react";
import { GEO_API } from "../.env/.env_api.js";
import { API_SWAP } from "../.env/.env_geo_api.js";
import {
  LocaleList,
  CountryCodes,
  CountryList,
} from "../helpers/localeMaping.js";
// import TokenGenerator from "../components/TokenGenerator.jsx";

export const McToolsContext = createContext({
  compareLocales: {},
  localeList: {},
  countryCode: {},
  urlGen: {},
  toolTip: "",
  isToolTip: false,
  errorType: "",
  geoInfo: {},
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
  handleCountryCodeLocaleSelect: () => {},
  handleUrlGeneratorOnChange: () => {},
  handleGetUrlGenerator: () => {},
  handleGetUrlGeneratorOnFocus: () => {},
  setUrlGeneratorVisited: () => {},
  handleTokenGeneratorOnChange: () => {},
  handleTokenGeneratorOnFocus: () => {},
  getLocaleOrCountryType: () => {},
  handleTokenGenLocaleSelect: () => {},
  handleTokenSelect: () => {},
  handleTokenGenChange: () => {},
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
      falseIndexes: [],
      localesWithContentArr: [],
      isLocaleListGenerate: false,
      isError: false,
      errorType: undefined,
      errorLocation: undefined,
    },
    countryCode: {
      input: "",
      target: undefined,
      value: "",
      result: undefined,
      isValid: undefined,
      resultType: undefined,
      showResult: false,
      isError: false,
      countryArr: [],
      multiLanguage: [],
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
    tokenGen: {
      getLocaleOrCountryType: "",
      type: "",
      localeObj: {},
      countryArr: [],
      multiLanguage: [],
      target: undefined,
      token: {},
      // TODO : clean up isError and isValid
      isError: false,
      errorType: undefined,
      isValid: false,
      resultType: undefined,
      // errorLocation: undefined,
      showResult: undefined,
    },
    isLoading: true,
    error: false,
    isToolTip: false,
    toolTip: "",
    errorType: undefined,
    geoInfo: {},
  });

  const fetchData = async () => {
    try {
      const response = await fetch(GEO_API);
      // Handle HTTP errors (404, 500...)
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await response.json();
      setMasterTools((prevState) => {
        return {
          ...prevState,
          geoInfo: { ...data },
          isLoading: false,
        };
      });
      //setData(data);
    } catch (error) {
      // Handle network errors OR thrown HTTP errors
      // console.error("Fetch failed, using default:", error.message);
      setMasterTools((prevState) => {
        return {
          ...prevState,
          geoInfo: { ...data },
          isLoading: false,
        };
      });
      //setData(API_SWAP); // Set your fallback here
    } finally {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(GEO_API);
    //     // Handle HTTP errors (404, 500...)
    //     if (!response.ok) {
    //       throw new Error("Server responded with an error");
    //     }
    //     const data = await response.json();
    //     setData(data);
    //   } catch (error) {
    //     // Handle network errors OR thrown HTTP errors
    //     console.error("Fetch failed, using default:", error.message);
    //     setData(API_SWAP); // Set your fallback here
    //   }
    //   // finally {
    //   //   setIsLoading(false);
    //   // }
    // };

    fetchData();
  }, []);

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
    // console.log(`handleCompareLocaleChange firing and value =`, value);
    const newArray = value === "" ? [] : value.replace(/\s+/g, "").split(",");
    // console.log(`handleCompareLocaleChange firing and newArray =`, newArray);
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
      // console.log(`no first or second input.length`);
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
      // console.log(`no first input.length`);
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
      // console.log(`no second input.length`);
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

  // Get Content change Locale List
  function handleLocaleGeneratorOnPaste(e) {
    e.preventDefault();
    const value = e.clipboardData?.getData("text");
    const arrayName = e.target.name;
    const newArr =
      arrayName === "firstInput"
        ? value
            .replace(/^\n/, "") // remove leading new line
            .replaceAll(" ", "") // remove spaces
            .replace(/\n*$/, "") // remove trailing newline from end
            .replace(/,\s*$/, "") //  remove trailing comma and/or followed by whitespace from end
            .replace(/\t/g, ",") // replace tabs with comma
            .replace(/(\r?\n){3,}/g, ", region\n") // testing
            .replace(/\n+/g, ",") // replace one or more newline characters with comma
            .split(",") // create new array
        : value
            .replace(/\n$/, "")
            .replace(/(\r\n|\n|\r)/g, ",")
            .split(",");
    const exp = /[_|-]/;
    if (arrayName === "firstInput") {
      const falseIndexes = newArr.reduce((acc, locale, index) => {
        if (!exp.test(locale)) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (falseIndexes?.length === newArr?.length) {
        // console.log(`in noValidLocales`);
        setMasterTools((prevState) => {
          return {
            ...prevState,
            localeList: {
              ...prevState.localeList,
              isError: true,
              errorType: "noValidLocales",
              errorLocation: "firstInput",
            },
          };
        });
      } else {
        // console.log(`looking good?`);
        setMasterTools((prevState) => {
          return {
            ...prevState,
            localeList: {
              ...prevState.localeList,
              falseIndexes: falseIndexes,
            },
          };
        });
      }
    }
    setMasterTools((prevState) => {
      // TODO Refactor this
      let cleanArr = [];
      if (prevState.localeList.falseIndexes.length > 0) {
        newArr.map((locale, index) => {
          if (!prevState.localeList.falseIndexes.includes(index)) {
            cleanArr.push(locale);
          }
        });
      } else {
        cleanArr = [...newArr];
      }
      return {
        ...prevState,
        localeList: {
          ...prevState.localeList,
          [arrayName]: value,
          [arrayName + "Arr"]: cleanArr,
        },
      };
    });
    e.target.blur();
  }

  function handleGetLocaleGeneratorList() {
    // console.log(`handleGetLocaleGeneratorList firing`);
    const len1 = masterTools.localeList.firstInputArr.length;
    const len2 = masterTools.localeList.secondInputArr.length;
    if (len1 === 0 || len2 === 0) {
      // console.log(`generateList error -  not equal`);
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
      // console.log(`localeList array lengths ==`);
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
        // console.log(`localeList GTG & localeArray =`, localeArray);
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            localesWithContentArr: [...localeArray],
            isLocaleListGenerate: true,
            isError: false,
            errorType: undefined,
            errorLocation: undefined,
          },
        };
      });
    } else {
      // console.log(`error - numbers don't match`);
      setMasterTools((prevState) => {
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
            isLocaleListGenerate: false,
            isError: true,
            errorType: "localeListInputNotEqual",
            errorLocation: "BOTH",
          },
        };
      });
    }
  }

  // TODO - need to add input check if valid locale
  function handleLocaleGeneratorOnChange(e) {
    const value = e.target.value;
    const target = e.target.dataset.type;
    const newValue = value === "" ? [] : value.split(", ");
    // console.log(`handleLocaleGeneratorOnChange firing`);
    // console.log(`value = ${value}`);
    // console.log(`target = ${target}`);
    // console.log(`newValue = ${newValue}`);
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
            [target]: "",
            [target + "Arr"]: [],
            isError: false,
            errorLocation: undefined,
            errorType: undefined,
          },
        };
      } else {
        return {
          ...prevState,
          localeList: {
            ...prevState.localeList,
          },
        };
      }
    });
  }

  function handleResetLocaleGeneratorListInput() {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        errorType: undefined,
        localeList: {
          ...prevState.localeList,
          firstInput: "",
          firstInputArr: [],
          secondInput: "",
          secondInputArr: [],
          falseIndexes: [],
          localesWithContentArr: [],
          isLocaleListGenerate: false,
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
    setMasterTools((prevState) => {
      return {
        ...prevState,
        countryCode: {
          ...prevState.countryCode,
          input: value,
          // value: value,
        },
      };
    });
  }
  // #HERE
  function handleGetCountryCode() {
    // TODO - Make this a function, put in helper file, and import
    const exp = new RegExp(/^[a-zA-Z0-9_-]+$/);
    const value = masterTools.countryCode.input;
    // console.log(`handleGetCountryCode and value =`, value);
    const valid = exp.test(value);
    const isLocale = value?.includes("_");
    const search = isLocale ? `id` : `isoCountryCode`;

    const countryArr = Object.values(masterTools.geoInfo).filter(
      (locale) =>
        locale[search].toLowerCase() ===
        masterTools.countryCode.input?.toLowerCase(),
    );
    // console.log(`1 countryArr =`, countryArr);

    if (value === undefined) {
      // checks for bad or no input
      // console.log(`value undefined`);
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
      // console.log(`value not noncharacter`);
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
      // console.log(`value is valid input`);
      if (value?.length < 2) {
        // console.log(`value short`);
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
        // console.log(`value too long`);
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
        // console.log(`input is good`);
        if (isLocale) {
          // console.log(`input is a locale`);
          const index = Locales.indexOf(value.toLowerCase());
          if (index < 0) {
            // console.log(`input is a locale and no match`);
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  // TODO add isErrro and use - not isValid - change logic in component too
                  isValid: true,
                  resultType: "LOCALENOTFOUND",
                  showResult: true,
                  result: undefined,
                },
              };
            });
          } else {
            // #HERE ##########
            const countryCode = CountryCodes[index];
            // console.log(`input is a locale and match found found`);
            // console.log(`I have countryArr[0] =`, countryArr[0]);
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  target: countryArr[0],
                  result: countryCode,
                  isValid: true,
                  resultType: "COUNTRYCODE",
                  showResult: true,
                },
              };
            });
          }
        } else {
          // console.log(`input is good and a country code`);
          // console.log(`my countries list`, Countries);
          // console.log(`value =`, value);
          const index = Countries.indexOf(value?.toLowerCase());
          // console.log(`index =`, index);
          if (countryArr?.length <= 0) {
            // console.log(`input is a country and no match found`);
            setMasterTools((prevState) => {
              return {
                ...prevState,
                countryCode: {
                  ...prevState.countryCode,
                  // isError: true, TODO move to using isError?
                  isValid: true,
                  resultType: "COUNTRYNOTFOUND",
                  showResult: true,
                  result: undefined,
                },
              };
            });
          } else {
            // console.log(`input is a country and match found`);
            // console.log(`countryArr =`, countryArr);
            const locale = LocaleList[index]; // TODO use input not value
            if (countryArr?.length > 1) {
              // console.log(`multilanguage country`);
              // console.log(`countryArr.length =`, countryArr?.length);
              setMasterTools((prevState) => {
                return {
                  ...prevState,
                  countryCode: {
                    ...prevState.countryCode,
                    multiLanguage: [...countryArr],
                    showResult: false,
                    resultType: "MULTILOCALE",
                  },
                };
              });
            } else {
              setMasterTools((prevState) => {
                return {
                  ...prevState,
                  countryCode: {
                    ...prevState.countryCode,
                    //result: locale,
                    target: countryArr[0],
                    result: Object.values(countryArr[0])[0],
                    isValid: true,
                    showResult: true,
                    resultType: "LOCALECODE",
                  },
                };
              });
            }
          }
        }
      }
    }
  }

  function handleCountryCodeLocaleSelect(e) {
    // console.log(`handleCountryCodeLocaleSelect firing`);
    const target = e.target.name;
    const data = masterTools.countryCode.multiLanguage?.find(
      (locale) => locale.id === target,
    );
    setMasterTools((prevState) => {
      return {
        ...prevState,
        countryCode: {
          ...prevState.countryCode,
          target: data,
          result: target,
          isValid: true,
          resultType: "LOCALECODE",
          showResult: true,
        },
      };
    });
  }

  function handleGetCountryCodeOnFocus() {
    // console.log(`handleGetCountryCodeOnFocus firing`);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        countryCode: {
          input: "",
          isValid: undefined,
          resultType: undefined,
          showResult: false,
          isError: false,
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
      // console.log(`trimmedArr =`, trimmedArr);
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
      if (!url.startsWith("http")) url = "http://" + url;
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
      const url = !masterTools.urlGen.url.startsWith("http")
        ? "https://" + masterTools.urlGen.url
        : masterTools.urlGen.url;
      const formatedUrl = new URL(url);
      const protocol = formatedUrl.protocol;
      const hostname = formatedUrl.hostname;
      const pathname = formatedUrl.pathname;
      const param = formatedUrl.search;
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
    // console.log(`handleGetCountryCodeOnFocus firing`);
    const location = e.target.dataset.type;
    // console.log(`location clicked = ${location}`);
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
      const hasError =
        prevLocation === "BOTH"
          ? true
          : prevLocation === location
            ? false
            : true;
      return {
        ...prevState,
        urlGen: {
          ...prevState.urlGen,
          isError: hasError,
          errorLocation: errorLocation,
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

  // #####
  // ##  TokenGenerator
  // #####

  function handleTokenGeneratorOnChange(e) {
    const value = e.target.value === "" ? undefined : e.target.value;
    // console.log(`handleTokenGeneratorOnChange firing and value =`, value);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        tokenGen: {
          ...prevState.tokenGen,
          input: value,
        },
      };
    });
  }

  function handleTokenGeneratorOnFocus() {
    setMasterTools((prevState) => {
      return {
        ...prevState,
        tokenGen: {
          ...prevState.tokenGen,
          // value: undefined,
          multiLanguage: [],
          errorType: undefined,
          isValid: undefined,
          resultType: undefined,
          showResult: false,
          isError: false,
        },
      };
    });
  }

  function getLocaleOrCountryType() {
    const value = masterTools.tokenGen.input;
    console.log(`getLocaleOrCountryType firing and input =`, value);

    // TODO - Make this a function, put in helper file, and import
    const exp = new RegExp(/^[a-zA-Z0-9_-]+$/);
    const valid = exp.test(value);
    const isLocale = value?.includes("_");
    const search = isLocale ? `id` : `isoCountryCode`;

    const countryArr = Object.values(masterTools.geoInfo).filter(
      (locale) =>
        locale[search].toLowerCase() ===
        masterTools.tokenGen.input.toLowerCase(),
    );
    // console.log(`1 countryArr =`, countryArr);

    if (value === undefined) {
      // checks for bad or no input
      // console.log(`value undefined`);
      setMasterTools((prevState) => {
        return {
          ...prevState,
          tokenGen: {
            ...prevState.tokenGen,
            isError: true,
            // errorLocation: undefined,
            errorType: "EMPTY",
            isValid: false,
            showResult: false,
          },
        };
      });
    } else if (!valid) {
      setMasterTools((prevState) => {
        return {
          ...prevState,
          tokenGen: {
            ...prevState.tokenGen,
            isError: true,
            errorLocation: undefined,
            errorType: "NONCHARACTER",
            isValid: false,
            showResult: false,
          },
        };
      });
    } else {
      // input is good and check for length and result
      if (value?.length < 2) {
        setMasterTools((prevState) => {
          return {
            ...prevState,
            tokenGen: {
              ...prevState.tokenGen,
              isError: true,
              errorLocation: undefined,
              errorType: "SHORT",
              isValid: false,
              showResult: false,
            },
          };
        });
      } else if (value?.length > 6) {
        setMasterTools((prevState) => {
          return {
            ...prevState,
            tokenGen: {
              ...prevState.tokenGen,
              isError: true,
              errorLocation: undefined,
              errorType: "LONG",
              isValid: false,
              showResult: false,
            },
          };
        });
      } else {
        // console.log(`input is good`);
        if (isLocale) {
          // console.log(`input is a locale`);
          const index = Locales.indexOf(value.toLowerCase());
          if (index < 0) {
            setMasterTools((prevState) => {
              return {
                ...prevState,
                tokenGen: {
                  ...prevState.tokenGen,
                  isError: true,
                  errorLocation: undefined,
                  errorType: "LOCALENOTFOUND",
                  isValid: false,
                  showResult: false,
                },
              };
            });
          } else {
            // #HERE
            // console.log(`isLOCALE and locale found`);
            // console.log(`I have countryArr[0] =`, countryArr[0]);
            const countryCode = CountryCodes[index];
            setMasterTools((prevState) => {
              return {
                ...prevState,
                tokenGen: {
                  ...prevState.tokenGen,
                  target: countryArr[0],
                  isValid: true,
                  showResult: true,
                  resultType: "LOCALENOTFOUND",
                },
              };
            });
          }
        } else {
          // console.log(`input is good and a country code`);
          if (countryArr.length <= 0) {
            setMasterTools((prevState) => {
              return {
                ...prevState,
                tokenGen: {
                  ...prevState.tokenGen,
                  isError: true,
                  errorLocation: undefined,
                  errorType: "COUNTRYNOTFOUND",
                },
              };
            });
          } else {
            if (countryArr.length > 1) {
              setMasterTools((prevState) => {
                return {
                  ...prevState,
                  tokenGen: {
                    ...prevState.tokenGen,
                    multiLanguage: [...countryArr],
                    isError: false,
                    errorType: undefined,
                  },
                };
              });
            } else {
              setMasterTools((prevState) => {
                return {
                  ...prevState,
                  tokenGen: {
                    ...prevState.tokenGen,
                    target: countryArr[0],
                    isValid: true,
                    showResult: true,
                    resultType: "LOCALECODE",
                    isError: false,
                    errorType: undefined,
                  },
                };
              });
            }
          }
        }
      }
    }
  }

  function handleTokenGenLocaleSelect(e) {
    const target = e.target.name;
    const data = masterTools.tokenGen.multiLanguage.find(
      (locale) => locale.id === target,
    );
    setMasterTools((prevState) => {
      return {
        ...prevState,
        tokenGen: {
          ...prevState.tokenGen,
          target: data,
          showResult: true,
        },
      };
    });
  }

  function handleTokenSelect(e) {
    const value = e.target.name;
    const newValue = `$` + value + `/`;
    const key = masterTools.tokenGen.target.urlPaths[value];
    // console.log(`my key value = ${key}`);
    setMasterTools((prevState) => {
      return {
        ...prevState,
        tokenGen: {
          ...prevState.tokenGen,
          token: { token: newValue, varTokenValue: newValue, key: key },
        },
      };
    });
  }

  function handleTokenGenChange(e) {
    // console.log(`handleTokenGenChange firing`);
    const value = e.target.value;
    const newKeyValue = value.split("/").toSpliced(0, 1).join("/");
    // console.log(e.target);
    // console.log(value);
    // console.log(newKeyValue);
    setMasterTools((prevState) => {
      const newObj = { ...prevState.tokenGen.token.key, tokenValue: value };
      return {
        ...prevState,
        tokenGen: {
          ...prevState.tokenGen,
          token: {
            ...prevState.tokenGen.token,
            varTokenValue: value,
            extendKey: newKeyValue,
          },
        },
      };
    });
  }

  const ctxValue = {
    compareLocales: masterTools.compareLocales,
    localeList: masterTools.localeList,
    countryCode: masterTools.countryCode,
    urlGen: masterTools.urlGen,
    tokenGen: masterTools.tokenGen,
    toolTip: masterTools.toolTip,
    isToolTip: masterTools.isToolTip,
    errorType: masterTools.errorType,
    geoInfo: masterTools.geoInfo,
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
    handleCountryCodeLocaleSelect: handleCountryCodeLocaleSelect,
    handleGetCompareLocales: handleGetCompareLocales,
    handleResetLocaleGeneratorListInput: handleResetLocaleGeneratorListInput,
    handleGetCountryCode: handleGetCountryCode,
    handleUrlGeneratorOnChange: handleUrlGeneratorOnChange,
    handleGetUrlGenerator: handleGetUrlGenerator,
    handleGetUrlGeneratorOnFocus: handleGetUrlGeneratorOnFocus,
    setUrlGeneratorVisited: setUrlGeneratorVisited,
    handleTokenGeneratorOnChange: handleTokenGeneratorOnChange,
    handleTokenGeneratorOnFocus: handleTokenGeneratorOnFocus,
    getLocaleOrCountryType: getLocaleOrCountryType,
    handleTokenGenLocaleSelect: handleTokenGenLocaleSelect,
    handleTokenSelect: handleTokenSelect,
    handleTokenGenChange: handleTokenGenChange,
  };

  return (
    <McToolsContext.Provider value={ctxValue}>
      {children}
    </McToolsContext.Provider>
  );
}
