const db = require('./db')

function mysql(sql) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }

            db.query(sql, (err, results) => {
                if (err) {
                    console.log(err)
                    db.rollback(() => {
                        reject(err)
                    })
                    return
                }
                if (!results.affectedRows) {
                    db.rollback(() => {
                        reject(results)
                    })
                    return
                }
                if (results.affectedRows) {
                    db.commit(() => {
                        resolve(results)
                    })
                }
            })
        })
    })
}

function mysqlSelect(sql) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) {
                reject(err)
                return
            }

            db.query(sql, (err, results) => {
                if (err) {
                    db.rollback(() => {
                        reject(err)
                    })
                    return
                }
                if (!results.length) {
                    db.rollback(() => {
                        reject(results)
                    })
                    return
                }
                if (results.length) {
                    db.commit(() => {
                        resolve(results)
                    })
                }
            })
        })
    })
}

module.exports = {
    mysql,
    mysqlSelect
}