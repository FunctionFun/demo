const getName = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('获取了名字')
  }, 1000)
})

getName
  .then(res => {
    console.log('getName res this', res, this)
  })
  .catch(err => {
    console.log('getName err', err)
  })

const getAge = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject('无法获取年龄了')
  }, 300)
})

getAge
  .then(res => {
    console.log('getAge res', res)
  })
  .catch(err => {
    console.log('getAge err this', err, this)
  })

// 一个普通的构造函数
class doSth {
  constructor() {
    this.name = '张三'
    this.age = '18'
    this.level = 2
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      const userInfo = {
        name: this.name,
        age: this.age
      }
      resolve(userInfo)
    })
  }

  getLogs() {
    this.getUserInfo()
      .then(res => {
        // 这里的this.name会打印出正确的值
        // 因为回调函数为箭头函数时，回调函数的this会指向他的直接上层，本例中指向doSth。
        console.log('doSth res', res)
        console.log('doSth this', this)
        console.log('name', this.name)
      })
      .catch(err => {
        console.log('doSth err', err)
      })
  }

  getLogs2() {
    this.getUserInfo()
      .then(function(res) {
        // 这里this.name会报错，TypeError: Cannot read property 'name' of undefined
        // 因为回调函数为匿名函数时，回调函数的this会指向window，需要对回调函数bind(this)
        console.log('doSth res', res)
        console.log('doSth this', this)
        console.log('name', this.name)
      })
      .catch(function(err) {
        console.log('doSth err', err)
      })
  }

  getLogs3() {
    this.getUserInfo()
      .then(function(res) {
        // 此回调函数为匿名函数，bind(this)后不再报错
        console.log('doSth res', res)
        console.log('doSth this', this)
        console.log('name', this.name)
      }.bind(this))
      .catch(function(err) {
        console.log('doSth err', err)
      })
  }
}

const toDoSth = new doSth()
