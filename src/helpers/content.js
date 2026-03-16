export const Content = [
  {
    type: "COMPARE_LOCALE",
    desc: [
      "This is a great tool when you need to compare and identify differences between two lists of locales. For example, you can use this tool to check for updates made in a content matrix against a previous version of the content matrix, or to compare the list of locales supported by a product against the list of locales in scope for a project.",
      "Below are some examples of the type of content you can enter into this tool.",
      "Your lists should be in the format of a comma deliminated list of locales in the format of language code + underscore + country code - ex: en_CA, es_ES, pt_BR",
    ],
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
      "This tool extracts a list of in-scope locales from a content matrix, which is typically shared as a spreadsheet. The matrix should include a column of locales and one or more content flag columns indicating whether each locale should receive the content associated with that column.",
      "How to use this tool:",
      "Copy the column containing the locales (for example: en_US, en_CA, es_MX, etc.) and paste it into the Locales input field.",
      "Copy the content flag column corresponding to the content update you want to evaluate and paste it into the Content Flags input field.",
      "Click Generate List to produce the list of locales that are in scope for the selected content.",
      "As you paste your data, a counter will appear for each input field showing the number of locales and content flags detected. When the counts match, the tool will generate the list of applicable locales.",
      "For additional verification, the tool also returns a complete reference list of all locales alongside their corresponding content flags. This allows you to quickly review the data and confirm accuracy before using the results.",
    ],
    example: {
      firstString:
        "en_CA, es_CL, es_MX, fr_CA, pt_BR, en_AU, en_NZ, ar_AE, cs_CZ, en_AE, it_IT",
      secondString: "*•*	*•*	*•*	*•* 	*•*		*•*	*•*		*•*",
    },
  },
  {
    type: "THIRD",
    desc: "Compare two lists of locales and find the differences and similarities between them.",
    view: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    data: {
      firstString: "",
      secondString: "",
    },
  },
];
