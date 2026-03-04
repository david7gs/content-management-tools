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
    type: "SECOND",
    desc: "Compare two lists of locales and find the differences and similarities between them.",
    view: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    data: {
      firstString: "",
      secondString: "",
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
