const get = (path, options = {}) => {
  return request({path, ...options, method: 'GET'})
}
const post = (path, options = {}) => {
  return request({path, ...options, method: 'POST'})
}

const request = ({path, method, ...options}) => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  console.log(options)

  return window.fetch('https://secret-mountain-18274.herokuapp.com/' + path, {
    method: method,
    headers,
    ...options,
  })
    .then(response => {return response.json()})
    .then(responseData => {
      return Promise.resolve(responseData.body)
    }, error => {
      console.log('error fetch')
      console.error(error)
      return Promise.reject(error)
    })
}

export default {
  get,
  post,
}
