//Background.js
import React from 'react';

const Background = ({ children }) => {
  return (
    <body className="h-screen transition-all bg-black dark:bg-backgroundBlack">
      {children}
    </body>
  );
};

export default Background;
