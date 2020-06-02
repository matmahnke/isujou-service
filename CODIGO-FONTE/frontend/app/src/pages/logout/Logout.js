import React from 'react'

import api from '../../services/api';

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

			<div className="spinner-border" role="status">
				<span className="sr-only">Carregando...</span>
			</div>
		</>
	)
};

export default Logout;