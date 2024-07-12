import React, { FC } from "react";
import { Navigate, Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import Dashboard from "../pages/auth/Dashboard/Dashboard";
import Profile from "../pages/auth/Profile/Profile";
import Pets from "../pages/auth/Pets/Pets";
import SideBar from "../components/SideBar";
import PetForm from "../pages/auth/Pets/PetForm";
import ConversationsList from "../pages/auth/Conversation/ConversationsList";
import Conversation from "../pages/auth/Conversation/Conversation";
import Matching from "../pages/auth/Matching";

interface AuthNavigatorProps {
  children?: React.ReactNode;
}

const AuthNavigator: FC<AuthNavigatorProps> = () => (
  <>
    <SideBar />
    <SlideRoutes>
    <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/matching" element={<Matching />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pet/form" element={<PetForm />} />
      <Route path="/conversations" element={<ConversationsList />} ></Route>
      <Route path="/conversation/:conversationId" element={<Conversation />} ></Route>
    </SlideRoutes>
  </>
);

export default AuthNavigator;
