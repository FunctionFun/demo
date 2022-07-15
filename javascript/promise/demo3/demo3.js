const getName = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('获取了名字')
  }, 1000)
})

const getAge = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('获取了年龄')
  }, 300)
})

const getUserInfo = new Promise((resolve, reject) => {
  const code = Math.round(Math.random())
  setTimeout(() => {
    if (code) {
      // 返回一个成功结果
      resolve('111-[code is 1]')
    } else {
      // 返回一个失败结果
      reject('111-[code is not 1]')
    }
  }, 300)
})

const getUserInfo2 = new Promise((resolve, reject) => {
  const code = Math.round(Math.random())
  setTimeout(() => {
    if (code) {
      // 返回一个成功结果
      resolve('222-[code is 1]')
    } else {
      // 返回一个失败结果
      reject('222-[code is not 1]')
    }
  }, 300)
})

getUserInfo2.catch(err => {
  console.log('getUserInfo2', err)
})

// 运算符优先级，.的优先级高于new, 所以以下catch写法是存在问题的，尽量使用getUserInfo2的写法
const getUserInfo3 = new Promise((resolve, reject) => {
  const code = Math.round(Math.random())
  setTimeout(() => {
    if (code) {
      // 返回一个成功结果
      resolve('333-[code is 1]')
    } else {
      // 返回一个失败结果
      reject('333-[code is not 1]')
    }
  }, 300)
}).catch(err => {
  console.log('getUserInfo2', err)
})

// 多个promise以数组传入Promise.all
const doPromiseAll = () => {
  Promise.all([getName, getAge])
    .then(result => {
      // result返回一个数组，下标与传入的数组一一对应，即使getName的结果获取到的时间比getAge晚
      console.log('result', result)
    })
    .catch(error => {
      console.log('error', error)
    })
}

// 多个promise以数组传入Promise.all
const doPromiseAll2 = () => {
  Promise.all([getName, getUserInfo, getAge])
    .then(result => {
      console.log('result', result)
    })
    .catch(error => {
      // 一旦传入的数组中有一个promise传回reject,那么不管其他promise是否完成，都会被catch捕捉到，并且then里面的代码不会有任何执行
      console.log('error', error)
    })
}

// 多个promise以数组传入Promise.all
const doPromiseAll3 = () => {
  Promise.all([getName, getUserInfo2, getAge])
    .then(result => {
      console.log('result', result)
    })
    .catch(error => {
      // 39行getUserInfo2的catch对promise.all没有影响，并且getUserInfo2的catch先打印了错误，然后才是doPromiseAll3的catch打印出错误
      // 一旦传入的数组中有一个promise传回reject,那么不管其他promise是否完成，都会被catch捕捉到，并且then里面的代码不会有任何执行
      console.log('error', error)
    })
}

// 多个promise以数组传入Promise.all
const doPromiseAll4 = () => {
  Promise.all([getName, getUserInfo3, getAge])
    .then(result => {
      // 由于getUserInfo3的catch写法有问题, 所以这里会返回 ["获取了名字", undefined, "获取了年龄"]
      // getUserInfo3的结果是undefined
      console.log('result', result)
    })
    .catch(error => {
      console.log('error', error)
    })
}

const doPromiseRace = () => {
  // promise.race意为多个promise同时执行，取最快时间返回resolve结果的那个
  // 此处getName和getUserInfo的延迟时间都是300ms，但是传入数组中时getName位于getUserInfo之前，所以最终取值getName
  Promise.race([getName, getUserInfo, getAge])
    .then(result => {
      console.log('result', result)
    })
    .catch(error => {
      console.log('error', error)
    })
}

const getName2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('无法获取名字了')
  }, 1000)
})

const getAge2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('无法获取年龄了')
  }, 300)
})

const getUserInfo4 = new Promise((resolve, reject) => {
  setTimeout(() => {
     reject('无法获取用户信息了')
  }, 300)
})

const doPromiseRace2 = () => {
  Promise.race([getName2, getUserInfo4, getAge2])
    .then(result => {
      console.log('result', result)
    })
    .catch(error => {
      // 此处catch返回的结果不按获取的时间顺序来，而是传入的数组下标顺序，所以这里打印出了getName2的reject返回的错误
      console.log('error', error)
    })
}

const doPromiseRace3 = () => {
  Promise.race([getName, getUserInfo4, getAge])
    .then(result => {
      // 由于getUserInfo4返回了reject，因此阻断了后面getAge的执行，虽然getAge的时间更短，但是只返回了getName的结果
      // 传入参数的顺序很重要
      console.log('result', result)
    })
    .catch(error => {
      console.log('error', error)
    })
}