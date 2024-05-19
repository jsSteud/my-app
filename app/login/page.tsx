"use client";
import React, { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Hub } from 'aws-amplify/utils';
import { useRouter } from 'next/navigation';



// The layout calls configure, but fetchAuthSession ends up executing first
// Will throw "AuthUserPoolException: Auth UserPool not configured."
// fetchAuthSession().then((session) => {
//   console.log(session);
// });


const LoginPage: React.FC = () => {
  const { push } = useRouter();

useEffect(() => {

Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signedIn':
      push('/dashboard');
      break;
  }
});

});
  return (
    <Authenticator socialProviders={['apple', 'google']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.userId}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

export default LoginPage;
