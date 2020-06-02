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

			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</>
	)
};

export default Logout;