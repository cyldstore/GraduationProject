const db = require('../db/db')
const { mysql, mysqlSelect } = require('../db/promise')
const { promisify } = require('util')

// 获取swiper数据
function swiperDb() {
    const sql = `select * from swiper`
    return mysqlSelect(sql)
}

// 获取评分前10的菜品
function hotdishesDb() {
    const sql = `select * from dishes order by averageRating desc limit 10`
    return mysqlSelect(sql)
}

// 根据id获取菜品详情
function dishDetailDb(id) {
    const sql = `select * from dishes where dishId='${id}'`
    return mysqlSelect(sql)
}

// 获取全部商品列表
function dishesDb() {
    const sql = `select * from dishes`
    return mysqlSelect(sql)
}

// 根据关键词搜索菜品
function searchDb(info) {
    const sql = `select * from dishes where name like '%${info}%' or description like '%${info}%' or category like '%${info}%'`
    return mysqlSelect(sql)
}

// 获取优惠券列表
function couponDb() {
    const sql = `select * from coupons where number != 0`
    return mysqlSelect(sql)
}

// 验证登陆
function verifyDb(openid) {
    const sql1 = `select * from customers where openid="${openid}"`
    return new Promise((resolve, reject) => {
        db.query(sql1, (err, results) => {
            if (err) {
                reject(-1)
            } else if (results.length == 0) {
                reject(0)
            } else if (results.length == 1) {
                resolve(results)
            }
        })
    })
}

// 注册
function registerDb(nickname, avatar, openid) {
    const sql = `insert into customers (userName,userAvatar,openid) values ('${nickname}','${avatar}','${openid}')`
    return mysql(sql)
}

// 根据openid获取用户信息
function myselfDb(openid) {
    const sql = `select * from customers where openid='${openid}'`
    return mysqlSelect(sql)
}

// 根据openid修改个人信息
function myselfEditDb(openid, params) {
    const sql = `update customers set userName='${params.userName}',gender='${params.gender}',phone=${params.phone} where openid='${openid}'`
    return mysql(sql)
}

// 获取地址
function addressDb(openid) {
    const sql = `select * from useraddresses where openid='${openid}' order by isDefault desc`
    return mysqlSelect(sql)
}

// 添加地址
function addAddressDb(openid, params) {
    const sql = `insert into useraddresses (openid, addressName,phoneNumber,address,detailAddress) values ('${openid}', '${params.addressName}','${params.phoneNumber}','${params.address}','${params.detailAddress}')`
    return mysql(sql)
}

// 设置默认地址
function addressDefaultDb(openid, userAddressId) {
    return new Promise((resolve, reject) => {
        db.query(`update useraddresses set isDefault=1 where openid='${openid}' and userAddressId='${userAddressId}'`, (err, results) => {
            if (err) {
                reject(err)
            } else if (results.affectedRows === 0) {
                reject(results)
            } else if (results.affectedRows === 1) {
                db.query(`update userAddresses set isDefault=0 where openid='${openid}' and userAddressId <> '${userAddressId}'`, (error, result) => {
                    if (error) {
                        reject(error)
                    } else if (!result.affectedRows) {
                        reject(result)
                    } else if (result.affectedRows) {
                        resolve(result)
                    }
                })
            }
        })
    })
}

// 获取具体地址
function addressDetailDb(openid, userAddressId) {
    const sql = `select * from useraddresses where openid='${openid}' and userAddressId='${userAddressId}'`
    return mysqlSelect(sql)
}

// 修改地址
function addressEditDb(openid, params) {
    const sql = `update useraddresses set addressName='${params.addressName}',phoneNumber='${params.phoneNumber}',address='${params.address}',detailAddress='${params.detailAddress}' where openid='${openid}' and userAddressId='${params.id}'`
    return mysql(sql)
}

// 删除地址
function addressDeleteDb(openid, id) {
    const sql = `delete from useraddresses where openid='${openid}' and userAddressId='${id}'`
    return mysql(sql)
}

// 根据dishId获取收藏
function favoritesDetailDb(openid, id) {
    const sql = `select * from favorites where openid='${openid}' and dishId='${id}'`
    return mysqlSelect(sql)
}

// 根据dishId添加收藏
function addFavoritesDb(openid, dishId) {
    const sql = `insert into favorites (openid,dishId) values ('${openid}','${dishId}')`
    return mysql(sql)
}

// 根据dishId删除收藏
function deleteFavoritesDb(openid, id) {
    const sql = `delete from favorites where openid='${openid}' and dishId='${id}'`
    return mysql(sql)
}

// 获取收藏列表
function favoritesDb(openid) {
    const sql = `select * from favorites join dishes on dishes.dishId=favorites.dishId where openid='${openid}'`
    return mysqlSelect(sql)
}

// 领取优惠券
function receiveCouponsDb(openid, couponId) {
    return new Promise((resolve, reject) => {
        let coupon, customerCoupon

        db.beginTransaction((err) => {
            if (err) {
                return reject(err)
            }

            // 检查优惠券是否可用
            db.query(`select * from coupons where couponId='${couponId}' and number > 0 for update`, (err, results) => {
                if (err) {
                    return db.rollback(() => reject(err))
                }

                if (results.length === 0) {
                    return db.rollback(() => reject('优惠已被领取完'))
                }

                coupon = results[0];

                // 检查用户是否已经领取过该优惠券
                db.query(`select * from customerscoupons where openid='${openid}' and couponId='${couponId}' for update`, (err, results) => {
                    if (err) {
                        return db.rollback(() => reject(err))
                    }

                    if (results.length === 0) {
                        // 如果用户没有领取过，则插入一条新记录
                        db.query(`insert into customerscoupons (openid, couponId, recivenumber, haveNumber) values ('${openid}', '${couponId}', 1, 1)`, (err, results) => {
                            if (err) {
                                return db.rollback(() => reject(err))
                            }

                            if (results.affectedRows !== 1) {
                                return db.rollback(() => reject('领取失败'))
                            }

                            customerCoupon = { openid, couponId, recivenumber: 1 }

                            // 更新优惠券的数量
                            db.query(`update coupons set number=number-1 where couponId='${couponId}'`, (err, results) => {
                                if (err) {
                                    return db.rollback(() => reject(err))
                                }

                                if (results.affectedRows !== 1) {
                                    return db.rollback(() => reject('更新优惠券数量失败'))
                                }

                                return db.commit(() => resolve('领取成功'))
                            })
                        });
                    } else {
                        customerCoupon = results[0]

                        if (customerCoupon.recivenumber === coupon.couponLimit) {
                            return db.rollback(() => reject('领取次数已达上限，请勿重复领取'))
                        }

                        const newNumber = customerCoupon.recivenumber + 1
                        const haveNumber = customerCoupon.haveNumber + 1

                        db.query(`update customerscoupons set recivenumber=${newNumber}, haveNumber=${haveNumber} where openid='${openid}' and couponId='${couponId}'`, (err, results) => {
                            if (err) {
                                return db.rollback(() => reject(err))
                            }

                            if (results.affectedRows !== 1) {
                                return db.rollback(() => reject('领取失败'))
                            }

                            customerCoupon.recivenumber = newNumber;

                            // 更新优惠券的数量
                            db.query(`update coupons set number=number-1 where couponId='${couponId}'`, (err, results) => {
                                if (err) {
                                    return db.rollback(() => reject(err))
                                }

                                if (results.affectedRows !== 1) {
                                    return db.rollback(() => reject('更新优惠券数量失败'))
                                }

                                return db.commit(() => resolve('领取成功'))
                            })
                        })
                    }
                })
            })
        })
    })
}

// 获取用户优惠券
function customerscouponsDb(openid) {
    const sql = `select * from customerscoupons join coupons on customerscoupons.couponId=coupons.couponId where openid='${openid}' and haveNumber!=0`
    return mysqlSelect(sql)
}

// 加入购物车
function addCartDb(openid, dishId) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) return reject(err)

            // 查询购物车是否已有该商品
            db.query(`select * from cart where openid='${openid}' and dishId='${dishId}'`, (err, results) => {
                if (err) return db.rollback(() => reject(err))

                // 若购物车没有该商品，添加该商品
                if (!results.length) {
                    db.query(`insert into cart (openid,dishId,quantity) values ('${openid}','${dishId}',1)`, (err, results) => {
                        if (err) return db.rollback(() => reject(err))
                        if (!results.affectedRows) return db.rollback(() => reject(results))
                        if (results.affectedRows) return db.commit(() => resolve(results))
                    })
                } else if (results.length) {
                    // 如果购物车已有该商品，则商品数量加一
                    const newquantity = results[0].quantity + 1
                    db.query(`update cart set quantity='${newquantity}' where openid='${openid}' and dishId='${dishId}'`, (err, results) => {
                        if (err) return db.rollback(() => reject(err))
                        if (!results.affectedRows) return db.rollback(() => reject(results))
                        if (results.affectedRows) return db.commit(() => resolve(results))
                    })
                }
            })
        })
    })
}

// 查询购物车商品数量
function cartquantityDb(openid) {
    const sql = `select coalesce(sum(quantity), 0) as total_quantity from cart where openid='${openid}'`
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) return reject(err)

            db.query(sql, (err, results) => {
                if (err) return db.rollback(() => reject(err))
                if (!results.length) return db.rollback(() => reject(results))
                if (results.length) return db.commit(() => resolve(results))
            })
        })
    })
}

// 获取购物车商品
function cartDb(openid) {
    const sql = `select * from cart join dishes on cart.dishId=dishes.dishId where openid='${openid}' order by isSelect desc`
    return mysqlSelect(sql)
}

// 选择商品
function isSelectCartDb(openid, params) {
    const sql = `update cart set isSelect=${params.isSelect ? 1 : 0} where openid='${openid}' and cartId='${params.cartId}'`
    return mysql(sql)
}

// 设置全选或全不选
function cartSelectAllDb(openid, selectAll) {
    const sql = `update cart set isSelect = case when ${selectAll} then 1 else 0 end where openid = '${openid}'`
    return mysql(sql)
}

// 购物车移除商品
function cartDeleteDb(openid, cartId) {
    const sql = `delete from cart where openid='${openid}' and cartId='${cartId}'`
    return mysql(sql)
}

// 增加商品
function cartPlusDb(openid, cartId) {
    const sql = `update cart set quantity=quantity+1 where openid='${openid}' and cartId='${cartId}'`
    return mysql(sql)
}

// 减少商品
function cartMinusDb(openid, cartId) {
    const sql = `update cart set quantity=quantity-1 where openid='${openid}' and cartId='${cartId}'`
    return mysql(sql)
}

// 更改商品数量
function cartQuantityDb(openid, params) {
    const sql = `update cart set quantity='${params.quantity}' where openid='${openid}' and cartId='${params.cartId}'`
    return mysql(sql)
}

// 获取购物车已选择商品
function cartSelectDb(openid) {
    const sql = `select * from cart join dishes on cart.dishId=dishes.dishId where openid='${openid}' and isSelect=1`
    return mysqlSelect(sql)
}

// 获取默认地址
function addressPayDb(openid) {
    const sql = `select * from useraddresses where openid='${openid}' and isDefault=1`
    return mysqlSelect(sql)
}

// 提交订单
function orderAddDb(openid, params) {
    const sql = `insert into orders (openid,orderTime,totalAmount,userAddressId,customerscouponId,createTime) values ('${openid}','${params.orderTime}','${params.totalAmount}','${params.userAddressId}','${params.customerscouponId}','${params.createTime}')`

    return mysql(sql)
}

// 提交订单详情并对购物车和优惠券进行修改
function orderDetailAddDb(openid, params) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) return reject(err)

            if (params.customerCouponId) {
                // 使用了优惠券
                console.log(1111)
                db.query(`update customerscoupons set haveNumber = haveNumber - 1 where openid='${openid}' and customerCouponId='${params.customerCouponId}'
                `, (err, results) => {
                    if (err) db.rollback(() => reject(err))
                    if (results && results.affectedRows) {
                        orderDetailUpdate(resolve, reject, openid, params)
                    } else {
                        db.rollback(() => reject(results))
                    }
                })
            } else {
                orderDetailUpdate(resolve, reject, openid, params)
            }
        })
    })
}

// 修改订单详情
function orderDetailUpdate(resolve, reject, openid, params) {
    if (params.sourceId !== 0) {
        // 订单来自菜品页面
        db.query(`insert into orderdetails (orderId,dishId,quantity,shopPrice) values ('${params.orderId}','${params.dishes[0].dishId}','${params.dishes[0].quantity}','${params.dishes[0].price}')`, (err, results) => {
            if (err) reject(err);
            if (results && results.affectedRows) {
                db.commit(() => resolve(results))
            } else {
                db.rollback(() => reject(results))
            }
        })
    } else {
        // 订单来自购物车
        const promises = params.dishes.map(item => {
            return new Promise((resolve, reject) => {
                db.query(`insert into orderdetails (orderId,dishId,quantity,shopPrice) values ('${params.orderId}','${item.dishId}','${item.quantity}','${item.price}')`, (err, results) => {
                    if (err) reject(err);
                    if (results && results.affectedRows) {
                        resolve(results)
                    } else {
                        reject(results)
                    }
                })
            })
        })
        Promise.all(promises).then(results => {
            db.query(`delete from cart where openid='${openid}' and isSelect='1'`, (err, results) => {
                if (err) db.rollback(() => reject(err))
                if (results && results.affectedRows) {
                    db.commit(() => resolve(results))
                } else {
                    db.rollback(() => reject(results))
                }
            })
        }).catch(err => {
            db.rollback(() => reject(err))
        })
    }
}

// 获取订单
function orderDb(openid, status) {
    console.log(status)
    const sql = `select *
    from orders
    join orderdetails on orders.orderId=orderdetails.orderId
    join dishes on orderdetails.dishId=dishes.dishId
    where openid='${openid}' and orders.status=${status}
    order by createTime desc`
    return mysqlSelect(sql)

}

// 获取订单详情
function orderDetailDb(openid, orderId) {
    const sql = `select *
    from orders
    join orderdetails on orders.orderId=orderdetails.orderId
    join useraddresses on orders.userAddressId=useraddresses.userAddressId
    join dishes on orderdetails.dishId=dishes.dishId
    where orders.openid='${openid}' and orders.orderId='${orderId}'
    `
    return mysqlSelect(sql)
}

// 取消订单
function cancelOrderDb(openid, orderId) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) reject(err)

            db.query(`select orders.customerscouponId from orders where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                if (err) db.rollback(() => reject(err))
                if (!results.length) db.rollback(() => reject(results))
                if (results.length) {
                    const customerscouponId = results[0].customerscouponId
                    if (customerscouponId === 0) {
                        // 没有使用优惠券
                        db.query(`delete from orders where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                            console.log(results)
                            if (err) db.rollback(() => reject(err))
                            if (!results.affectedRows) db.rollback(() => reject(results))
                            if (results.affectedRows) db.commit(() => resolve(results))
                        })
                    } else {
                        // 使用了优惠券
                        db.query(`update customerscoupons set haveNumber=haveNumber+1 where openid='${openid}' and customerCouponId='${customerscouponId}'`, (err, results) => {
                            if (err) db.rollback(() => reject(err))
                            if (results && results.affectedRows) {
                                db.query(`delete from orders where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                                    console.log(results)
                                    if (err) db.rollback(() => reject(err))
                                    if (results && results.affectedRows) {
                                        db.commit(() => resolve(results))
                                    } else {
                                        db.rollback(() => reject(results))
                                    }
                                })
                            } else {
                                db.rollback(() => reject(results))
                            }
                        })
                    }
                }
            })
        })
    })
}

// 完成订单
function completeOrderDb(openid, orderId) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) reject(err)
            db.query(`select orders.customerscouponId from orders where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                if (err) {
                    db.rollback(() => reject(err))
                    return
                }
                if (!results.length) {
                    db.rollback(() => reject(results))
                    return
                }
                const customerscouponId = results[0].customerscouponId
                if (customerscouponId === 0) {
                    // 没有使用优惠券
                    db.query(`update orders set status=2 where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                        if (err) {
                            db.rollback(() => reject(err))
                            return
                        }
                        if (results.affectedRows > 0) {
                            db.commit(() => resolve(results))
                        } else {
                            db.rollback(() => reject(results))
                        }
                    })
                } else {
                    db.query(`select customerscoupons.haveNumber from customerscoupons where openid='${openid}' and customerCouponId='${customerscouponId}'`, (err, results) => {
                        if (err) {
                            db.rollback(() => reject(err))
                            return
                        }
                        if (!results.length) {
                            db.rollback(() => reject(results))
                            return
                        }
                        const haveNumber = results[0].haveNumber
                        if (haveNumber === 0) {
                            db.query(`update customerscoupons set isused=1 where openid='${openid}' and customerCouponId='${customerscouponId}'`, (err, results) => {
                                if (err) {
                                    db.rollback(() => reject(err))
                                    return
                                }
                                if (results.affectedRows > 0) {
                                    db.query(`update orders set status=2 where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                                        if (err) {
                                            db.rollback(() => reject(err))
                                            return
                                        }
                                        if (results.affectedRows > 0) {
                                            db.commit(() => resolve(results))
                                        } else {
                                            db.rollback(() => reject(results))
                                        }
                                    })
                                } else {
                                    db.rollback(() => reject(results))
                                }
                            })
                        } else {
                            db.query(`update orders set status=2 where openid='${openid}' and orderId='${orderId}'`, (err, results) => {
                                if (err) {
                                    db.rollback(() => reject(err))
                                    return
                                }
                                if (!results.affectedRows) {
                                    db.rollback(() => reject(results))
                                }
                                if (results.affectedRows) {
                                    db.commit(() => resolve(results))
                                }
                            })
                        }
                    })
                }
            })
        })
    })
}

// 获取评价页面订单信息
function orderRateDb(openid, orderId) {
    const sql = `select *
    from orders
    join orderdetails on orders.orderId=orderdetails.orderId
    join dishes on orderdetails.dishId=dishes.dishId
    where orders.openid='${openid}' and orders.orderId='${orderId}'
    `
    return mysqlSelect(sql)
}

// 提交评论
function uploadRateDb(openid, rate) {
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) reject(err)

            db.query(`update orders set isComment=1 where openid='${openid}' and orderId='${rate.orderId}'`, (err, results) => {
                if (err) db.rollback(() => reject(err))
                if (!results.affectedRows) db.rollback(() => reject(results))
                if (results.affectedRows) {
                    const promise = rate.dishes.map(item => {
                        const rateImg = item.rateImg.join(',')
                        return new Promise((resolve, reject) => {
                            if (item.rate) {
                                db.query(`update dishes set averageRating=(averageRating+${item.rate})/2 where dishId=${item.dishId}`, (err, results) => {
                                    console.log(results, 1111)
                                    if (err) reject(err)
                                    if (!results.affectedRows) reject(results)
                                    if (results.affectedRows) {
                                        db.query(`insert into comments (openid,dishId,commentText,rate,orderId,commentImgUrl,createtime) values ('${openid}','${item.dishId}','${item.comment}','${item.rate}','${rate.orderId}','${rateImg}','${rate.time}')`, (err, results) => {
                                            console.log(results, 2222)
                                            if (err) db.rollback(() => reject(err))
                                            if (!results.affectedRows) reject(results)
                                            if (results.affectedRows) resolve(results)
                                        })
                                    }
                                })
                            } else {
                                db.query(`update dishes set averageRating=(averageRating+5)/2 where dishId=${item.dishId}`, (err, results) => {
                                    console.log(results, 33333)
                                    if (err) reject(err)
                                    if (!results.affectedRows) reject(results)
                                    if (results.affectedRows) {
                                        db.query(`insert into comments (openid,dishId,commentText,rate,orderId,commentImgUrl,createtime) values ('${openid}','${item.dishId}','${item.comment}',5,'${rate.orderId}','${rateImg}','${rate.time}')`, (err, results) => {
                                            console.log(results, 44444)
                                            if (err) db.rollback(() => reject(err))
                                            if (!results.affectedRows) reject(results)
                                            if (results.affectedRows) resolve(results)
                                        })
                                    }
                                })
                            }
                        })
                    })
                    Promise.all(promise)
                        .then(res => {
                            db.commit(() => resolve(res))
                        })
                        .catch(err => {
                            db.rollback(() => {
                                reject(err)
                            })
                        })
                }
            })
        })
    })
}

// 获取评论
function getRateDb(openid, orderId) {
    const sql = `select *
    from orders
    join comments on orders.orderId=comments.orderId
    join dishes on comments.dishId=dishes.dishId
    where orders.openid='${openid}' and orders.orderId='${orderId}'
    `
    return mysqlSelect(sql)
}

// 获取菜品评论
function shopRateDb(dishId) {
    const sql = `select * from comments join customers on comments.openid=customers.openid where comments.dishId=${dishId}`
    return mysqlSelect(sql)
}

// 注销账号
function logoutDb(openid) {
  return new Promise(async (resolve, reject) => {
    try {
      const beginTransactionPromise = util.promisify(db.beginTransaction).bind(db);
      const commitPromise = util.promisify(db.commit).bind(db);
      const rollbackPromise = util.promisify(db.rollback).bind(db);

      await beginTransactionPromise();

      await db.queryAsync(`delete from customers where openid='${openid}'`);
      const results = await db.affectedRowsAsync();
      if (!results) {
        await rollbackPromise();
        reject(results);
        return;
      }

      await db.queryAsync(`delete from comments where openid='${openid}'`);
      await db.queryAsync(`delete from cart where openid='${openid}'`);
      await db.queryAsync(`delete from customerscoupons where openid='${openid}'`);
      await db.queryAsync(`delete from favorites where openid='${openid}'`);
      await db.queryAsync(`delete from orders where openid='${openid}'`);
      await db.queryAsync(`delete from useraddresses where openid='${openid}'`);

      await commitPromise();
      resolve();
    } catch (err) {
      await rollbackPromise();
      reject(err);
    }
  });
}

  

module.exports = {
    swiperDb,
    hotdishesDb,
    dishDetailDb,
    dishesDb,
    searchDb,
    couponDb,
    verifyDb,
    registerDb,
    myselfDb,
    myselfEditDb,
    addAddressDb,
    addressDb,
    addressDefaultDb,
    addressDetailDb,
    addressEditDb,
    addressDeleteDb,
    favoritesDetailDb,
    addFavoritesDb,
    deleteFavoritesDb,
    favoritesDb,
    receiveCouponsDb,
    customerscouponsDb,
    addCartDb,
    cartquantityDb,
    cartDb,
    isSelectCartDb,
    cartSelectAllDb,
    cartDeleteDb,
    cartPlusDb,
    cartMinusDb,
    cartQuantityDb,
    cartSelectDb,
    addressPayDb,
    orderAddDb,
    orderDetailAddDb,
    orderDb,
    orderDetailDb,
    cancelOrderDb,
    completeOrderDb,
    orderRateDb,
    uploadRateDb,
    getRateDb,
    shopRateDb,
    logoutDb
}