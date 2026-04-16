module.exports = (data) => {
    const newData = [];
    for (let i = 0; i < data.length; ++i) {
        const newObj = {};
        for (const [key, value] of Object.entries(data[i])) {
            const newKey = key.split("_");
            if (newKey.length === 1) {
                newObj[key] = value;
                continue;
            }
            for (let i = 1; i < newKey.length; ++i) {
                newKey[i] =
                    newKey[i].charAt(0).toUpperCase() + newKey[i].slice(1);
            }
            newObj[newKey.join("")] = value;
        }
        newData.push(newObj);
    }
    return newData;
};
