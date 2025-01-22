console.log('hello world!')

//預設執行start

//npm install --save-dev jest
//Jest 是一個廣泛使用的 JavaScript 測試框架，常用於單元測試和集成測試。

//jsdom 是一個非常有用的工具，特別是在伺服器端模擬瀏覽器行為時，讓你可以像在瀏覽器中一樣處理 DOM 結構。

/*
devDependencies：僅在開發過程中使用的套件，不會包含在生產環境的最終部署中（例如：測試工具、編譯工具）。
dependencies：專案運行所需的核心依賴，會在應用程式部署到生產環境時被安裝。
*/
/*
    process.argv 列出所有命令列參數：
        /home/jerry/.nvm/versions/node/v18.7.0/bin/node: Node.js 的執行路徑。
        /home/jerry/webcrawlerhttp/main.js: 腳本的檔案路徑。
        https://wagslane.dev: 提供的網站參數。
*/

const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
async function main() {
    if (process.argv.length < 3) {
        console.log('no website provived')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('too many arguments')
        process.exit(1)
    }
    const baseURL = process.argv[2]
    /*
    for (const arg of process.argv) {
        console.log(arg)
    }
    */

    console.log(`starting crawl of ${baseURL}`)
    //3個args 為 (baseURL, currentURL, pages)
    const pages = await crawlPage(baseURL, baseURL, {})

    /*
    // in : key value
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
    */

    printReport(pages)
}


main()
