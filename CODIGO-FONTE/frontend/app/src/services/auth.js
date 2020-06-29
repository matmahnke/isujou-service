import api from '../services/api'

export const isAuthenticated = () => {
  var token = localStorage.getItem('Authorization')

  api.get('auth/is-authenticated')
    .then(resp => {
      const { data } = resp

      if (data === false && token !== null) window.location.href = '/logout'
    })
    .catch((ex) => {
      window.location.href = '/logout'
    })

    return token !== null
};