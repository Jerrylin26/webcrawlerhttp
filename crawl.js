function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1) //刪除最後一個字符
    } else {
        return hostPath
    }
}

//是在 Node.js 或 CommonJS 模組 的環境下，將 normalizeURL 函數或變數導出，使其可以在其他檔案中使用。
module.exports = { normalizeURL }