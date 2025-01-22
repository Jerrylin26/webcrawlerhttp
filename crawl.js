const { JSDOM } = require("jsdom")

/*
    href : "https://example.com:8080/path/to/resource?query=123#section"
    hostname : "example.com"
*/

async function crawlPage(baseURL, currentURL, pages) {

    //檢查是否為同一個網域
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    //檢查是否已經爬過
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL] += 1
        return pages
    }
    // 確認是新的後，開始爬蟲
    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling: ${currentURL}`)
    //console.log(currentURLObj)

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }

        // recursively crawl next pages
        // 喪心病狂
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        // of :array 迭代
        for (const nextURL of nextURLs) {
            // 假設 crawlPage 修改了 pages 並返回一個新物件
            pages = await crawlPage(baseURL, nextURL, pages);
        }
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    return pages

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
                console.log(`error with absolute url: ${err.message}`)

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