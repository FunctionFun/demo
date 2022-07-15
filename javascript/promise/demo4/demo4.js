// 匿名回调函数
const doCallback = () => {
  getFullName('张', '三', res => {
    console.log('res', res, new Date().getTime())
  })
}

// 具名回调函数
const doCallback2 = () => {
  getFullName('李', '四', info)
}

const getFullName = (firstName, lastName, callback) => {
  setTimeout(() => {
    const fullName = `${firstName}${lastName}`
    console.log('全名是', fullName, new Date().getTime())
    callback(fullName)
  }, 600)
}

const info = res2 => {
  console.log('info', res2, new Date().getTime())
}

function getAge(name, callback) {
  setTimeout(() => {
    if (name == '张三') {
      console.log(`${name}的年龄是 `, 18)
      callback(18)
    } else {
      console.log('什么也没找到')
      callback(false)
    }
  }, 600)
}

function getUserInfo(name, age, callback) {
  setTimeout(() => {
    const userInfo = { name, age }
    console.log('userInfo', userInfo)
    callback(userInfo)
  }, 600)
}

// 回调地狱，多层callback嵌套
// 父函数的代码执行完成时，才会执行子函数，这样可以确保获得父函数异步的值
const doCallback3 = () => {
  getFullName('张', '三', name => {
    console.log('获得用户全名', name)
    getAge(name, age => {
      console.log('获得用户年龄', age)
      getUserInfo(name, age, userInfo => {
        console.log('获得用户信息', userInfo)
      })
    })
  })
}

// return
// return写法无法获取到异步的值，最终造成获取的数据错误
const doReturn = () => {
  const name = getFullName2('张', '三')
  const age = getAge2(name)
  const userInfo = getUserInfo2(name, age)
  console.log('获得用户信息', userInfo)
}

const getFullName2 = (firstName, lastName) => {
  setTimeout(() => {
    const fullName = `${firstName}${lastName}`
    console.log('全名是', fullName, new Date().getTime())
    return fullName
  }, 600)
}

function getAge2(name) {
  if (name == '张三') {
    console.log(`${name}的年龄是 `, 18)
    return 18
  } else {
    console.log('什么也没找到')
    return false
  }
}

function getUserInfo2(name, age) {
  const userInfo = { name, age }
  console.log('userInfo', userInfo)
  return userInfo
}

// promise写法
const doPromise = () => {
  getFullName3('张', '三')
    .then(res => {
      console.log('promise 获得了用户全名', res)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (res == '张三') {
            console.log(`${res}的年龄是 `, 18)
            resolve({
              name: res,
              age: 18
            })
          } else {
            console.log('什么也没找到')
            reject('什么也没找到')
          }
        }, 600)
      })
    })
    .then(res => {
      console.log('promise 获得了用户年龄', res.age)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userInfo = {
            name: res.name,
            age: res.age,
            level: 2
          }
          console.log('userInfo', userInfo)
          resolve(userInfo)
        }, 600)
      })
    })
    .then(res => {
      console.log('promise 获得了用户信息', res)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getFullName3 = (firstName, lastName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fullName = `${firstName}${lastName}`
      console.log('全名是', fullName, new Date().getTime())
      resolve(fullName)
    }, 600)
  })
}

// Async/Await写法
const doAsync = async () => {
  const name = await getFullName3('张', '三')
  const age = await getAge3(name)
  const userInfo = await getUserInfo3(name, age)
  console.log('Async/Await 获得了用户信息', userInfo)
}

function getAge3(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name == '张三') {
        console.log(`${name}的年龄是 `, 18)
        resolve(18)
      } else {
        console.log('什么也没找到')
        reject('什么也没找到')
      }
    }, 600)
  })
}

function getUserInfo3(name, age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userInfo = { name, age }
      console.log('userInfo', userInfo)
      resolve(userInfo)
    }, 600)
  })
}
