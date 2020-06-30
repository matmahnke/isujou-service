import React from 'react'

import api from '../../services/api';
import Loading from '../../components/Loading/Loading'

const Logout = () => {
  const deslogar = () => {
    api.get('auth')
       .finally(() => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('currentUserId');
         window.location.href = '/home'
       })
  }

  return (
    <>
      {deslogar()}

      <Loading />
    </>
  )
};

export default Logout;