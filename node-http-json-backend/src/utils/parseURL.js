const parseURL = (url) => {
    const [endpoint, uniqId] = url.split("/").filter(Boolean);
    return [endpoint, uniqId];
};

module.exports = parseURL;
