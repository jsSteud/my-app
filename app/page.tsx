"use client";
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from "aws-amplify/auth";

// The layout calls configure, but fetchAuthSession ends up executing first
// Will throw "AuthUserPoolException: Auth UserPool not configured."
fetchAuthSession().then((session) => {
  console.log(session);
});


const LoginPage: React.FC = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

export default LoginPage;
