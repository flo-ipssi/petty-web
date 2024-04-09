import React, { FC } from "react";
import { Instance, createPopper } from "@popperjs/core";
import SideBar from "./SideBar";

type Props = {}

interface TabNavigatorProps {
    children?: React.ReactNode;
  }
const AuthContainer: FC<TabNavigatorProps> = ({children}) => {

  return (
    
    <div>
      <SideBar />
        {children}
    </div>
  )

}
    

export default AuthContainer