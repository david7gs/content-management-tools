export const Content = [
  {
    type: "COMPARE_LOCALE",
    desc: [
      "This tool is ideal for finding differences between two locale lists. For example, you can use it to check what changed between two versions of a content matrix, or to compare a product's supported locales against the locales in scope for a project.",
      "Here are some examples of what you can enter into this tool.",
      "Format your lists as a comma-separated list using the language code + underscore + country code format -- for example: en_CA, es_ES, pt_BR",
    ],
    isExample: true,
    example: {
      firstString:
        "es_CO, id_ID, es_419, en_419, en_AM, en_AZ, bg_BG, en_BH, ar_BH, et_EE, en_EG, ar_EG, en_GE, el_GR, hr_HR, en_IL, en_JO, ar_JO, en_KG, en_KW, ar_KW, en_KZ, lt_LT, lv_LV, en_MD, zh_MO, en_OM, ar_OM, en_QA, ar_QA, ro_RO, en_SI, sk_SK, en_TJ, en_TM, uk_UA, en_UZ, en_ZA",
      secondString:
        "es_CO, fi_FI, id_ID, pt_PT, es_419, en_419, bg_BG, en_BH, ar_BH, et_EE, el_GR, hr_HR, en_IL, en_JO, ar_JO, en_KW, ar_KW, lt_LT, lv_LV, zh_MO, en_OM, ar_OM, en_QA, ar_QA, ro_RO, en_SI, uk_UA, en_ZA",
    },
  },
  {
    type: "LOCALE_LIST_GENERATOR",
    desc: [
      "This tool pulls the relevant locales from a content matrix, which is usually shared as a spreadsheet. The matrix needs a column of locales and at least one content flag column that marks whether each locale should receive the associated content.",
      "How to use this tool:",
      "1. Copy the locale column (e.g., en_US, en_CA, es_MX) and paste it into the Locales field.",
      "2. Copy the content indicator flag column for the content update you want to check and paste it into the Content indicator field.",
      "3. Click Generate List to see which locales are in scope for the selected content.",
      "As you paste your data, a counter will appear besides each field label showing how many locales and content indicator flags were detected. When the two counts match, the tool will generate your locale list.",
      "The tool also returns a full reference list showing all locales alongside their content flags, so you can quickly review and confirm the results before using them.",
    ],
    // example: {
    //   firstString:
    //     "en_CA, es_CL, es_MX, fr_CA, pt_BR, en_AU, en_NZ, ar_AE, cs_CZ, en_AE, it_IT",
    //   secondString: "*•*	*•*	*•*	*•* 	*•*		*•*	*•*		*•*",
    // },
  },
  {
    type: "COUNTRY_CODE",
    desc: [
      // "When working with a large number of locales, it can be hard to remember every corresponding country code -- or to know which locale matches a given country code.",
      // "This tool lets you quickly look up a locale from a country code, or a country code from a locale.",
      // "Examples:",
      // "Not sure what country code goes with de_CH? Enter it and click Generate -- the tool will return chde, which you can paste directly into your AEM URL.",
      // "Given the country code lae (Latin America English) and need the locale? Enter it, click Generate, and the tool will return en_419 for use in your AEM URL field.",
      // "",
      "When working with a large number of locales, it can be hard to remember every corresponding country code -- or to know which locale matches a given country code.",
      "This tool lets you quickly look up a locale from a country code, or a country code from a locale.",
    ],
    example: {
      firstString:
        // "If you are unsure of the correct country code for the 'de_CH' locale - entering it and selecting the generate button will give you 'chde'. You can copy and paste this into your AEM URL.",
        "Not sure what country code goes with de_CH? Enter it and click Generate -- the tool will return chde, which you can paste directly into your AEM URL.",
      secondString:
        // "Or say you are given 'lae' (Latin America English) country code, put it into the input field, select Generate, and you will find that 'en_419' is the locale to enter into the AEM URL field."
        "Given the country code lae (Latin America English) and need the locale? Enter it, click Generate, and the tool will return en_419 for use in your AEM URL field.",
    },
  },
  {
    type: "LOCALE_LIST_GENERATOR_HELP",
    desc: [
      "There are a number of reasons why you may get this error. Copying data from spreadsheets can be tricky due to the nature of inconsistent formatting and hidden characters you cannot see but are nevertheless there in your data.",
      "When using this tool the most common reason relates to the region separator rows and if the column with all the locales, has text in the region separator cell. If the cell is empty you may need to edit the spreadsheet and remove/delete the locale regional separator rows. It is recommended you make your own copy of the spreadsheet before making any edits.",
      "The images below are examples of the locale regions separator rows to help identify when you will need to make a copy of the spreadsheet and remove the rows.",
    ],
    img: [
      {
        path: "./src/assets/img/working.png",
        caption:
          "This sheet will capture the data correctly. It has text in the locale column.",
      },
      {
        path: "./src/assets/img/notWorking.png",
        caption:
          "This sheet will NOT capture the data correctly. It does Not have text in the locale column. In this case, either delete the row in black or enter some text in the blank cell highlighted in red and generate the list again.",
      },
    ],
  },
];
