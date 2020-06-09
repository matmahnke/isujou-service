import React from 'react'
import GoogleLogin from 'react-google-login'

/* global gapi */

const Auth = () => {
    function onSignIn(googleUser) {
        // var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    // function signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function () {
    //         console.log('User signed out.');
    //     });
    // }

    // const responseGoogle = (response) => {
    //     console.log(response);
    // }
    
    return <>
        <GoogleLogin
            clientId=""
            onSuccess={onSignIn}

            disabled={false}
            cookiePolicy={'single_host_origin'}
        />
    </>
}
export default Auth;