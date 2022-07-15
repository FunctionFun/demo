const todoSth = () => {
  const code = Math.round(Math.random())
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        // 返回 0 或 1
        code
      }
      if (res.code) {
        // 返回一个成功结果
        resolve('[code is 1]')
      } else {
        // 返回一个失败结果
        reject('[code is not 1]')
      }
    }, 2000)
  })
}

const doPromise = () => {
  console.log('执行 promise 方法', new Date().getTime())
  todoSth()
    .then(res => {
      console.log('成功', res, new Date().getTime())
    })
    .catch(err => {
      console.log('失败', err, new Date().getTime())
    })
}

const doAsync = async () => {
  console.log('执行 async 方法', new Date().getTime())
  try {
    const res = await todoSth()
    console.log('成功', res, new Date().getTime())
  } catch (err) {
    console.log('失败', err, new Date().getTime())
  }
  console.log('the next step', new Date().getTime())
}

// 可用，但不推荐的写法，没有加上try...catch..., 当 todoSth 报错时，会阻塞后面代码的执行
const doAsync2 = async () => {
  console.log('执行 async 方法2', new Date().getTime())
  const res = await todoSth()
  console.log('成功2', res, new Date().getTime())
  console.log('the next step', new Date().getTime())
}
