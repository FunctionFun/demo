const todoDefault = (res, err) => {
  // 返回 0 或 1
  const code = Math.round(Math.random())
  setTimeout(() => {
    if (code) {
      res('[code is 1]')
    } else {
      // 返回一个失败结果
      err('[code is not 1]')
    }
  }, 300)
}

// 普通回调函数
const doSth = () => {
  console.log('一个普通的回调函数')
  todoDefault(
    res => {
      console.log('成功', res)
    },
    err => {
      console.log('失败', err)
    }
  )
}

// promise函数
const todoSth = () => {
  // 返回 0 或 1
  const code = Math.round(Math.random())
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code) {
        // 返回一个成功结果
        resolve('[code is 1]')
      } else {
        // 返回一个失败结果
        reject('[code is not 1]')
      }
    }, 300)
  })
}

// 也可以使用 throw new Error 抛出错误，但是不推荐
const todoSthSameError = new Promise((resolve, reject) => {
  throw new Error('[something is error]')
})

const todoSthSameError2 = new Promise((resolve, reject) => {
  reject(new Error('[something is error2]'))
})

// 推荐的写法，catch 写在代码块最后
const doSth1 = () => {
  console.log('一个普通的promise')
  todoSth()
    .then(res => {
      console.log('成功', res)
    })
    .catch(err => {
      console.log('失败', err)
    })
}

// doSth1Same 写法等同于 doSth1
const doSth1Same = () => {
  console.log('一个普通的promise')
  todoSth()
    .then(res => {
      console.log('成功', res)
    })
    .then(undefined, err => {
      console.log('失败', err)
    })
}

// catch 捕获错误
const doSth1SameError = () => {
  todoSthSameError.catch(err => {
    console.log('失败1', err)
  })
  todoSthSameError2.catch(err => {
    console.log('失败2', err)
  })
}

// 可用的写法， 但不推荐
const doSth2 = () => {
  console.log('一个普通的promise2')
  todoSth().then(
    res => {
      console.log('成功', res)
    },
    err => {
      console.log('失败', err)
    }
  )
}

// then 链式调用
const doCall = () => {
  console.log('promise 链式调用')
  todoSth()
    .then(
      res => {
        console.log('[step1 is success]', res, new Date().getTime())
      },
      err => {
        console.log('[step1 is error]', err, new Date().getTime())
      }
    )
    .then(() => {
      console.log('step2', new Date().getTime())
    })
}

// then 链式调用, 参数传递
const doAgain = () => {
  console.log('多层 promise 链式调用')
  todoSth()
    .then(res => {
      console.log('step1 is success', res, new Date().getTime())
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('[step1 after]', new Date().getTime())
          resolve('[step1 after New Promise resolve.]')
        }, 1000)
      })
    })
    .then(res => {
      // 后一个 then 可获得前一个 then 的 resolve 返回值
      console.log('[step2 res]', res, new Date().getTime())
      console.log('step2', new Date().getTime())
    })
    .catch(err => {
      console.log('失败', err)
    })
}

// 多个 promise 嵌套， 只需要在最外层加 catch
const doAgain2 = () => {
  console.log('多层 promise 链式调用')
  todoSth()
    .then(res => {
      console.log('step1 is success', res, new Date().getTime())
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('[step1 after]', new Date().getTime())
          if (5 > 10) {
            resolve('计算正确，[step1 after is success.]')
          } else {
            reject('计算错误，[step1 after is error.]')
          }
        }, 1000)
      })
    })
    .then(res => {
      console.log('[step2 res]', res, new Date().getTime())
      console.log('step2', new Date().getTime())
    })
    .catch(err => {
      console.log('失败', err)
    })
}

const doAgain3 = () => {
  console.log('多层 promise 链式调用')
  todoSth()
    .then(step1res => {
      console.log('step1 res', step1res, new Date().getTime())
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('[step1 after]', new Date().getTime())
          if (5 > 10) {
            resolve('计算正确，[step1 after is success.]')
          } else {
            reject('计算错误，[step1 after is error.]')
          }
        }, 1000)
      })
    })
    .then(step2res => {
      // 当前一个 then 报错, 这个 then 内的代码不会被执行
      console.log('[step2 res]', step2res, new Date().getTime())
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('[step2 after]', new Date().getTime())
          if (5 < 10) {
            resolve('计算正确，[step2 after is success.]')
          } else {
            reject('计算错误，[step2 after is error.]')
          }
        }, 1000)
      })
    })
    .catch(err => {
      console.log('失败', err)
    })
}

// promise对象的错误，会一直向后传递，直到被捕获。
// 即错误总会被下一个catch所捕获。
// then方法指定的回调函数，若抛出错误，也会被下一个catch捕获。
// catch中也能抛错，则需要后面的catch来捕获。
const doCatch = () => {
  console.log('捕获catch中的错误')
  todoSthSameError
    .catch(err => {
      console.log('失败', err)
      throw new Error('something is error')
    })
    .catch(err => {
      console.log('失败2', err)
      throw new Error('something is error 222')
    })
    .catch(err => {
      console.log('失败3', err)
    })
}
