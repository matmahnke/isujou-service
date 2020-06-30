import api from '../services/api'

export const isAuthenticated = () => {
  var possuiToken = localStorage.getItem('Authorization') !== null;

  api.get('auth/is-authenticated')
    .then(resp => {
      const { data } = resp

      if (data === false && possuiToken) window.location.href = '/logout'
    })
    .catch((ex) => {
      if (possuiToken)
        window.location.href = '/logout'
    })

    return possuiToken
};