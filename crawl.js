const { JSDOM } = require("jsdom")

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }

}
function getURLsFromHTML(htmlBody, baseurl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlobj = new URL(`${baseurl}${linkElement.href}`)
                urls.push(urlobj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }

        } else {
            //absolute
            try {
                const urlobj = new URL(linkElement.href)
                urls.push(urlobj.href)
            } catch (err) {
                console.log(`error with abolute url: ${err.message}`)
            }

        }


    }
    return urls
}


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
module.exports = { normalizeURL, getURLsFromHTML, crawlPage }