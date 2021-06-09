import React, { useState, useEffect } from 'react';

const GoogleAuth = () => {
    const [signedIn, setSignedIn] = useState(null);

    // Initializing the gapi with more modern syntax
    useEffect(() => {
        window.gapi.load('client:auth2', async () => {
            await window.gapi.client.init({
                clientId: '628761691696-3eatjmn2flh76csd65o20pja10u683p2.apps.googleusercontent.com',
                scope: 'email'
            });

            const auth = window.gapi.auth2.getAuthInstance();
            setSignedIn(auth.isSignedIn.get());
            auth.isSignedIn.listen(() => setSignedIn(auth.isSignedIn.get())); //Set listener for authentication status change
        });
    }, []);

    const AuthButton = () => {
        if (!signedIn){
            return(
                <div>Not Signed in</div>
            );
        }

        return(
            <div>Signed in!</div>
        );
    }

    return(
        <div>
            { AuthButton() }
        </div>
    );
};

export default GoogleAuth;