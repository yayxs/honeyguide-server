const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  database: 'memorandum',
  password: '123456'
})

// 进行连接

connection.connect()
// 执行sql语句

function exec(sql) {
  const p = new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })

  return p
}

module.exports = {
  exec
}
