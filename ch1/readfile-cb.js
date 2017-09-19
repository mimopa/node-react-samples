const fs = require('fs')

// ファイルの読み込み
fs.readFile('kakugen.txt', 'utf-8', function (err, data) {
    // 読込みが完了したときの処理
    console.log(data)
})
