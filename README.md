# cm-tools

Content Management Resources is a set of tools designed to increase the productivity and accuracy of content managers by reducing the amount of manual effort spent identifying and comparing in-scope locales for content update requests as well as reduce the likelihood of errors inherent in manual identification and comparison of locale lists quickly and accurately. A separate tool is designed to quickly return a list of URLs to speed up visual Q/A of updated content/configuration when many locales are touched in one request.

The Content Management Resources is a SPA (Single Page App) written in React, Javascript, and CSS and is built in such a way that an internet connection is not needed for it to function as designed. It can be run locally with no loss of functionality or hosted. In addition, there is no database connectivity and no information, data, or actions are shared in any way. When inspecting the app in browser, from the network tab, it can be viewed there are no GET or POST requests at any time. The app interacts with non-confidential information, most of the data entered and returned is common ISO language codes.

The SPA’s code is reviewable, in it’s entirety, at any time.

This is a work in progress and several usability enhancements as well as adding additional quick reference, non-confidential information related to content management activities is planned and will be worked on as time permits.

Currently the App has 4 tools:

1. Compare Locale Strings - Compare and find differences between locale strings
2. Locale List Generator - generates a list of locales in scope for a given configuration change request based on locale string inputs copy pasted from content matrixes
3. Get a Country Code - Returns a country code (ex. "us") from a given locale code and visa versa.
4. Testing URL Generator - Generates a list of URLs for QA based on a given string of locales

I. Compare Locale Strings

The second tool in the tool set is the Compare Locale Strings tool. This tool provides a quick and accurate way to compare strings of locales, identifying what locales are/not included in each string.

Content Manager are constantly tasks to determine content updates and changes. One of the most frequent ways we do this is by manually comparing different locale strings for differences and making updates according to the differences. A locale that was in group A, may have moved to group B or C and the only way to know there was a change and what locale was effected by the change is to manually compare the strings. depending on the number of locales involved this can be a very detailed, time consuming, and error prone task requiring multiple iterations to ensure accuracy.

The Compare Locale Strings tool automates this comparison task, instantly completing a task that potentially could take upwards of 30 minutes.

Examples of content pasted into tool:
Locale string 1:
es_CO, id_ID, es_419, en_419, en_AM, en_AZ, bg_BG, en_BH, ar_BH, et_EE, en_EG, ar_EG, en_GE, el_GR, hr_HR, en_IL, en_JO, ar_JO, en_KG, en_KW, ar_KW, en_KZ, lt_LT, lv_LV, en_MD, zh_MO, en_OM, ar_OM, en_QA, ar_QA, ro_RO, en_SI, sk_SK, en_TJ, en_TM, uk_UA, en_UZ, en_ZA

Locale string 2:
es_CO, fi_FI, id_ID, pt_PT, es_419, en_419, bg_BG, en_BH, ar_BH, et_EE, en_EG, ar_EG, el_GR, hr_HR, en_IL, en_JO, ar_JO, en_KW, ar_KW, lt_LT, lv_LV, zh_MO, en_OM, ar_OM, en_QA, ar_QA, ro_RO, en_SI, sk_SK, uk_UA, en_ZA

This allows the content manager to quickly asses where - what locale(s) - need to be reconfigured.

Example: A Content Manager is working on a project and is notified there is a change in locales for a given configuration based on a given content matrix. In order to determine what locales are effected from this change, a comparison of locales, before and after, is required. Before the Compare Locale Strings tool, this process was done manually by hand (or spreadsheet) - comparing the locales in one list agains the locales in the second list and manipulating spreadsheet cells or hand written notes. The Compare Locale Strings tool dramatically speeds up this process and instantly returns the deltas in each provided string while also identifying which field the locale delta(s) is from. Taking a tedious, time consuming, and error prone task from tens of minutes to instant - and with no errors.

II. Locale List Generator

As a content manager, frequently there are times we need to derive a list of locale strings in order to find the difference and make configuration changes based on this difference. Before this tool, extracting locale stings from a Matrix was manual, time consuming, and had the possibility of human error.

With this tool, from the provided content Matrix, the CM copies the column of locales in scope, the column indicating what locales have/not given content and/or variation.

Examples of content pasted into tool:

Locale string copied from Matrix
“es_ES, fr_FR, en_IN, it_IT, ja_JP, ko_KR, es_MX, en_MY, en_SG, th_TH”

“es_CL\nzh_CN\nes_CO\nde_DE\nes_ES\nfr_FR\nen_IN\nit_IT\nja_JP\nko_KR\n”

Has/not content string copied from Matrix. Please note: below you will see lines of dots, this is an exact replication of what is pasted in the second input cell. Dot represents, “yes, content update is relevant for this cell.”
•

•
•

•
•
•

•

The returned string of locales can then be used to configure content variations among uses.

Example: A request is received to update a Feature Card’s back of card copy for a number of locales. Per provided Matrix (and frequently a sting of provided locales) - it is determined that this will need to be a copy alt and the CM will need to determine if a new or existing variation is the best option. The necessary matrix columns are copied and pasted into the correct fields, Generate list button is clicked and a string of the correct locales is returned.

At times, for any given project or content update request, we are manually looking through a content matrix with up to 106 locales in scope. Manually identifying and extracting the locales in the given scope. Due to the manual nature of this task, the potential for error is large and at times it is necessary to repeat this task multiple times in order to ensure the accuracy of the extracted data. With the Locale List Generator tool, a task that could take 30 minutes, is completed in 2 minutes with complete accuracy.

III. Get a Country Code

IV. Testing URL Generator

The third tool in the tool set is the Testing URL Generator tool. This tool returns a clickable list of URLs for a given URL and locale string (list of URLS).

As a content manager, there are times requests span a great number of locales, all of which require Q/A and visual inspection. The Testing URL Generator speeds up the visual QA process by returning a list of URLs that need to be tested. By clicking on a link the link is marked as visited, a visual indicator notifying the CM this locales has been reviewed. This tool reduces the time spent manually manipulating URLs and endures all locales in scope are not missed.

This tool is currently disabled pending tools approval.

Examples of content pasted into tool:
Field 1: ( Preview URL )
https://www.myurl.com

Field 2:
es_CO, id_ID, es_419, en_419, bg_BG, en_BH, ar_BH, et_EE, en_EG, ar_EG, el_GR, hr_HR, en_IL, en_JO, ar_JO, en_KW, ar_KW, lt_LT, lv_LV, zh_MO, en_OM, ar_OM, en_QA, ar_QA, ro_RO, en_SI
