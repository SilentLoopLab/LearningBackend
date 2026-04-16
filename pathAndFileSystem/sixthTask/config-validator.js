module.exports = (str, keys) => {
    const data = str.split('\n');
    for (const elem of data) {
        let newStr = '';
        let i = 0
        while( elem[i] !== '=') {
            newStr += elem[i++];
        }
        if (!keys.has(newStr)) {
            continue;
        }
        
        if (elem[++i] !== undefined) {
            keys.delete(newStr);
        }
    }
    if (!keys.size) {
        return true;
    } 
    return false;
}