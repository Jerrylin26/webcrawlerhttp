//是從 Jest 測試框架中導入 test 和 expect 這兩個函數，用於編寫測試案例和進行斷言。
const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')
/*
'https://boot.dev' -> 'boot.dev'
'http://boot.dev' -> 'boot.dev'
'https://Boot.dev' -> 'boot.dev'
*/

//標準化 URL 並移除協議https://
test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})


test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 2,
        'https://wagslane.dev/path2': 3,
        'https://wagslane.dev/path3': 5,
        'https://wagslane.dev/path4': 7
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path4', 7],
        ['https://wagslane.dev/path3', 5],
        ['https://wagslane.dev/path2', 3],
        ['https://wagslane.dev', 2],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})