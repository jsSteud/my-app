"use client";
import React, { useEffect, useState } from 'react';
import { AuthSession, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import Data from './components/Data';

interface User {
    userId: string;
    username: string;
}

const CheckAuth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();
  const [idToken, setIdToken] = useState<string | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser: User | null = await getCurrentUser();
        const session: AuthSession | null = await fetchAuthSession();
        
        if (currentUser) {
          setUser(currentUser);
        }
        
        if (session?.tokens?.accessToken) {
          const idToken = session.tokens.idToken?.toString();
          const accessToken = session.tokens.accessToken.toString();
          
          setIdToken(idToken);
          setAccessToken(accessToken);
        }
      } catch (error) {
        push('/login');
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (accessToken) {
    //   console.log('Updated Access Token:', accessToken);
    }
    if (idToken) {
    //   console.log('Updated ID Token:', idToken);
    }
  }, [accessToken, idToken]);

  return (
    <div>
      {user ? (
        <>
        <h1>Willkommen, {user.userId}! </h1>
        {/* <Button colorScheme='teal' size='md'>Neuen User anlegen</Button> */}
        <Data></Data>
        </>
      ) : (
        <h1>Weiterleitung...</h1>
      )}
    </div>
  );
};

export default CheckAuth;
