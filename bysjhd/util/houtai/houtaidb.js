// 后台管理数据库操作
const db = require('../db/db')
const {mysql,mysqlSelect} = require('../db/promise')

// 验证后台管理员
function loginSelect(userName, password) {
    return new Promise((resolve, reject) => {
        db.query(`select * from admin where userName = "${userName}" and password = "${password}"`, (err, results) => {
            if (results.length == 0) {
                db.query(`select * from admin where userName = "${userName}"`, (err, results) => {
                    if (results.length == 0) {
                        resolve(1)
                        return
                    }
                })
                db.query(`select * from admin where password = "${password}"`, (err, results) => {
                    if (results.length == 0) {
                        resolve(2)
                        return
                    }
                })
            }
            if (results.length > 0) {
                resolve(0)
                return
            }
        })
    })
}

// 获取菜品列表
function foodsDb() {
    const sql = `select * from dishes`
    return new Promise((resolve,reject) => {
        db.query(sql,(err,results) => {
            if(err) {
                reject(err)
                return
            }
            if(!results.length) {
                reject('暂无数据')
                return
            }
            if(results.length) {
                resolve(results)
                return
            }
        })
    })
}

// 菜品添加
function foodsAddDb(dishname, dishdescription, dishcategory, dishimageUrl, dishprice) {
    const sql = `insert into dishes (name,description,category,imageUrl,price) values ('${dishname}','${dishdescription}','${dishcategory}','${dishimageUrl}','${dishprice}')`
    return mysql(sql)
}

// 菜品修改
function foodsEditDb(dishId, dishname, dishdescription, dishcategory, dishimageUrl, dishprice) {
    let sql = `update dishes set name='${dishname}',description='${dishdescription}',category='${dishcategory}',price='${dishprice}'`
    if (dishimageUrl.length) {
        sql += `,imageUrl='${dishimageUrl}'`
    }
    sql += ` where dishId='${dishId}'`
    return mysql(sql)
}

// 菜品删除
function foodsDeleteDb(id) {
    const sql = `delete from dishes where dishId=${id}`
    return mysql(sql)
}

// 获取轮播图数据
function swiperDb() {
    const sql = `select * from swiper`
    return mysqlSelect(sql)
}

// 添加轮播图
function swiperuploadDb(imgUrl) {
    const sql = `insert into swiper (swiperUrl) values ("${imgUrl}")`
    return mysql(sql)
}

// 删除轮播图
function swiperDeleteDb(id) {
    const sql = `delete from swiper where swiperId="${id}"`
     return mysql(sql)
}

// 获取优惠券数据
function couponDb() {
    const sql = `select * from coupons where number != 0`
    return mysqlSelect(sql)
}

// 添加优惠券
function couponAddDb(couponLimit,condition,value,number) {
    const sql = `insert into coupons (couponLimit,couponCondition,value,number) values (${couponLimit},${condition},${value},${number})`
    return mysql(sql)
}

// 修改优惠券
function couponEditDb(id,limit,condition,value,number) {
    const sql = `update coupons set couponLimit='${limit}',couponCondition='${condition}',value='${value}',number='${number}' where couponId='${id}'`
    return mysql(sql)
}

// 删除优惠券-数量设置为0
function couponDeleteDb(id) {
    const sql = `update coupons set number = 0  where couponId='${id}'`
    return mysql(sql)
}

// 获取订单数据
function ordersDb() {
    const sql = `select *
    from orders
    join orderdetails on orders.orderId=orderdetails.orderId
    join useraddresses on orders.userAddressId=useraddresses.userAddressId
    join dishes on orderdetails.dishId=dishes.dishId
    order by orderTime desc`
    return mysqlSelect(sql)
}

// 接单
function orderAccessDb(orderId) {
    const sql = `update orders set status=1 where orderId=${orderId}`
    return mysql(sql)
}

// 获取用户
function customersDb() {
    const sql = `select * from customers`
    return mysqlSelect(sql)
}

// 删除用户
function deleteuserDb(customerId) {
    const sql = `delete from customers where customerId=${customerId}`
    return mysql(sql)
}

// 获取评论
function getCommentsDb() {
    const sql = `select *
    from comments
    join dishes on comments.dishId=dishes.dishId
    join customers on comments.openid=customers.openid
    `
    return mysqlSelect(sql)
}

// 删除评论
function deleteCommentDb(commentId) {
    const sql = `delete from comments where commentId=${commentId}`
    return mysql(sql)
}

module.exports = {
    loginSelect,
    foodsDb,
    foodsAddDb,
    foodsEditDb,
    foodsDeleteDb,
    swiperDb,
    swiperuploadDb,
    swiperDeleteDb,
    couponDb,
    couponAddDb,
    couponEditDb,
    couponDeleteDb,
    ordersDb,
    orderAccessDb,
    customersDb,
    deleteuserDb,
    getCommentsDb,
    deleteCommentDb
}