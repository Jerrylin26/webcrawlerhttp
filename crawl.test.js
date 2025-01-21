//是從 Jest 測試框架中導入 test 和 expect 這兩個函數，用於編寫測試案例和進行斷言。
const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')
/*
'https://boot.dev' -> 'boot.dev'
'http://boot.dev' -> 'boot.dev'
'https://Boot.dev' -> 'boot.dev'
*/

//標準化 URL 並移除協議https://
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

//指的是 URL 或路徑字串中的最後一個斜線 /
test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})




