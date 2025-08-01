export const transfromTextToMin = (text) => {
    return text.toLowerCase().replace(/\s/g, "").replace("-", "").replace(".", "").replace("’", "").replace("/", "");
}
