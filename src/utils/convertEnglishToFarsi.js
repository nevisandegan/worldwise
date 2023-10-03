export default function convertEnglishToFarsi(str) {
    const charsMapping = {
        ك: "ک",
        دِ: "د",
        بِ: "ب",
        زِ: "ز",
        ذِ: "ذ",
        شِ: "ش",
        سِ: "س",
        ى: "ی",
        ي: "ی",
        ئ: "ی",
        "١": "۱",
        "٢": "۲",
        "٣": "۳",
        "٤": "۴",
        "٥": "۵",
        "٦": "۶",
        "٧": "۷",
        "٨": "۸",
        "٩": "۹",
        "٠": "۰",
    };

    return Object.keys(charsMapping).reduce((prev, curr) => {
        return prev.replaceAll(curr, charsMapping[curr]);
    }, str || "");
}

