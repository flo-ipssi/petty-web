import React, { FC } from "react";
import { Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import Home from "../pages/main/Home/Home";
import Download from "../pages/main/Download/Download";
import Goal from "../pages/main/Goal/Goal";
import About from "../pages/main/About/About";
import Navbar from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";
import SignUp from "../pages/main/SignUp/SignUp";
import Alert from "../components/Alert";

interface TabNavigatorProps {
  children?: React.ReactNode;
}

const TabNavigator: FC<TabNavigatorProps> = () => (
    <><Header /><Alert/><SlideRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/objectives" element={<Goal />} />
    {/* <Route path="/simplifions" element={<Infos />} /> */}
    <Route path="/download" element={<Download />} />
    <Route path="/signup" element={<SignUp stepInitial={0} />} />
  </SlideRoutes><Navbar /></>
);

export default TabNavigator;
