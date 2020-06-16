import React from 'react'

import api from '../../services/api';
import Loading from '../../components/Loading/Loading'

const Logout = () => {
	const deslogar = () => {
		api.get('auth')
			.then((res) => {
				localStorage.removeItem('Authorization');
				window.location.href = '/home'
			})
			.catch((ex) => {
				console.log(ex)
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