import React, { FC } from 'react';
import './AppContainer.scss';

interface AppContainerProps {
  children: React.ReactNode
}

const AppContainer: FC<AppContainerProps> = ({children}) => (
  <div className="AppContainer">
    {children}
  </div>
);

export default AppContainer;
