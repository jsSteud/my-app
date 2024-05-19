"use client";
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const CheckAuth: React.FC = () => {
  const [user, setUser] = useState(null);
  const { push } = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        push('/login');
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <h1>Willkommen, {user.userId}! Du bist eingeloggt.</h1>
      ) : (
        <h1>Redirecting...</h1>
      )}
    </div>
  );
};

export default CheckAuth;
