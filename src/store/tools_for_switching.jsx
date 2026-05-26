// ######
// ##  left off here trying to handle locale list gen when spacer row cell is empty
// ######

function handleLocaleGeneratorOnPaste(e) {
  e.preventDefault();
  const value = e.clipboardData?.getData("text");
  const arrayName = e.target.name;
  const newArr =
    arrayName === "firstInput"
      ? value
          //.replace(/^\n/, "") // remove leading new line
          .replaceAll(" ", "") // remove spaces
          //.replace(/\n*$/, "") // remove trailing newline from end
          .replace(/,\s*$/, "") //  remove trailing comma and/or followed by whitespace from end
          .replace(/\t/g, ",") // replace tabs with comma
          .replace(/([A-Za-z]{2}_[A-Za-z]{2,3}\n)/g, "$1,")
          .replace(/\n{2}/g, ",spacer,") // replace 2 newline characters with text followed by comma
          .replace(/\n/g, "")
          .split(",") // create new array
      : // .replace(/^\n/, "") // remove leading new line
        // .replaceAll(" ", "") // remove spaces
        // .replace(/\n*$/, "") // remove trailing newline from end
        // .replace(/,\s*$/, "") //  remove trailing comma and/or followed by whitespace from end
        // .replace(/\t/g, ",") // replace tabs with comma
        // .replace(/\n+/g, ",") // replace one or more newline characters with comma
        // .split(",") // create new array
        value
          .replace(/\n$/, "")
          .replace(/(\r\n|\n|\r)/g, ",")
          .split(",");
  console.log(`my newArray before`, newArr);
  const exp = /[_|-]/;
  if (arrayName === "firstInput") {
    const falseIndexes = newArr.reduce((acc, locale, index) => {
      if (!exp.test(locale)) {
        acc.push(index);
      }
      return acc;
    }, []);
    // console.log(`indexes list? =`, localesIndexes);
    // const localesIndexes = newArr.reduce((acc, locale, index) => {
    //   if (exp.test(locale)) {
    //     acc.push(index);
    //   }
    //   return acc;
    // }, []);
    // console.log(`indexes list? =`, localesIndexes);
    if (falseIndexes?.length === newArr?.length) {
      console.log(`in noValidLocales`);
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
      console.log(`looking good?`);
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

function handleGetCompareLocales() {
  const firstInput = [...masterTools.compareLocales.firstInputArr];
  const secondInput = [...masterTools.compareLocales.secondInputArr];
  const localesInBoth = [];
  const inOneNotTwo = [];
  const AlsoInBoth = [];
  const inTwoNotOne = [];
  // const firstInputInvalid = [];
  // const secondInputInvalid = []
  const exp = /[_|-]/;

  if (firstInput.length > 0) {
    const firstInputInvalid = firstInput.reduce((acc, locale, index) => {
      if (exp.test(locale)) {
        console.log(`locale test`, !exp.test(locale));
        acc.push(index);
      }

      return acc;
    }, []);

    console.log(`firstInputInvalid = `, firstInputInvalid);
  }
  if (secondInput.length > 0) {
    const secondInputInvalid = secondInput.reduce((acc, locale, index) => {
      if (!exp.test(locale)) {
        acc.push(index);
      }
      return acc;
    }, []);
    console.log(`secondInputInvalid = `, secondInputInvalid);
  }

  if (!firstInput.length && !secondInput.length) {
    console.log(`no first or second input.length`);
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
    console.log(`no first input.length`);
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
    console.log(`no second input.length`);
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
  } else if (secondInput?.length === 100000) {
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
