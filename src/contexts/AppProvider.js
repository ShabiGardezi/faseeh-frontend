import React from 'react';
import { UserProvider } from './UserContext';
import { ActivityLogProvider } from './ActivityLogContext';

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <ActivityLogProvider>
        {children}
      </ActivityLogProvider>
    </UserProvider>
  );
};

export default AppProvider;
