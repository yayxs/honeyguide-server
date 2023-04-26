const http = require('http')
require('./mysql')
const { exec } = require('./mysql')
const hostname = '127.0.0.1'
const port = 2024

// 插入一条数据
const create = async () => {
  const sql = 'INSERT INTO cont_info(cont) VALUES("12")'
  const res = await exec(sql)
  console.log('res', res)
}

const server = http.createServer((req, res) => {
  const url = req.url // 完整的url
  const method = req.method // 请求方式
  const ct = req.headers['content-type']
  res.setHeader('Content-type', 'application/json') // 设置返回数据为json
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (method === 'post' || method === 'POST') {
    if (ct === 'application/json') {
      let postDataStr = ''
      req.on('data', (chunk) => {
        console.log('chunk', chunk)
        postDataStr += chunk.toString() // chunk 是原始二进制数据
      })
      req.on('end', () => {
        console.log('传送上拉的数据是', typeof postDataStr, postDataStr)
        create()

        const retObj = {
          code: 0,
          msg: '请求成功'
        }
        const str = JSON.stringify(retObj)
        res.end(str)
      })
    }
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
