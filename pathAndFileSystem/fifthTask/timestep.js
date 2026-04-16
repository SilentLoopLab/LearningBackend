module.exports = (log) => {
    const date = new Date().toISOString();
    return date.concat(`: ${log}\n`);
};
