"use client";
import React from 'react';
import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports, {
  ssr: true
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IT-Infrastruktur</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
