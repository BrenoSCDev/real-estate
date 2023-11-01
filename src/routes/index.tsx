import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/home";
import { LoginPage } from "../pages/login";
import { RegisterUserCNPJ } from "../pages/register/UserCNPJ";
import { RegisterUserCPF } from "../pages/register/UserCPF";
import { RegisterType } from "../pages/register/RegisterType";
import { PrivacyPolicyPage } from "../pages/policy/privacy";
import { CookiePolicy } from "../pages/policy/cookie";
import { TermsConditionPage } from "../pages/policy/terms";
import { PropertiesPage } from "../pages/properties";
import { PropertyPage } from "../pages/propertyPage";
import { UserDetails } from "../pages/dashboard/userDetails";
import { FavoriteProperties } from "../pages/dashboard/userFavoriteProperties";
import { UserProperties } from "../pages/dashboard/userProperties";
import { PostProperty } from "../pages/dashboard/userProperties/editProperty/postProperty";
import { UpdateProperty } from "../pages/dashboard/userProperties/editProperty/updateProperty";
import { ConfirmUser } from "../pages/register/ConfirmUser";

import { DashBoardLayout } from "../pages/dashboard/layout";
import { MainLayout } from "../layout";

import { UseAuth } from "../hooks";

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const {isAuth} = UseAuth()
    if (isAuth) {
      return element
    } else {
      return (
        <MainLayout>
          <LoginPage/>
        </MainLayout>
      ) 
    }
  }

export const router = createBrowserRouter([
  {
    path: "/",
    element:  
    <MainLayout>
      <Home/>
    </MainLayout>
  },
  {
    path: "/Login",
    element: 
    <MainLayout>
      <LoginPage/>
    </MainLayout>
  },

  {
    path: "/Register",
    element: 
    <MainLayout>
      <RegisterType/>
    </MainLayout>
  },
  {
    path: "/Privacy",
    element: 
    <MainLayout>
      <PrivacyPolicyPage/>
    </MainLayout>
  },
  {
    path: "/CookiePolicy",
    element:
    <MainLayout>
      <CookiePolicy/>
    </MainLayout>
  },
  {
    path: "/TermsOfCondition",
    element:
    <MainLayout>
      <TermsConditionPage/>
    </MainLayout>
  },
  {
    path: "/RegisterUserCpf",
    element:
    <MainLayout>
      <RegisterUserCPF/>
    </MainLayout>
  },
  {
    path: "/RegisterUserCnpj",
    element:
    <MainLayout>
      <RegisterUserCNPJ/>
    </MainLayout>
  },
  {
    path: "/PropertiesPage/:params",
    element:
    <MainLayout>
      <PropertiesPage/>
    </MainLayout>
  },
  {
    path: "/PropertyPage/:id",
    element: 
    <MainLayout>
      <PropertyPage/>
    </MainLayout>
  },
  {
    path: "/ConfirmUser/:email",
    element: 
    <MainLayout>
      <ConfirmUser/>
    </MainLayout>
  },
  {
    path: "/DashBoard/UserDetails",
    element: 
    <PrivateRoute element={
      <DashBoardLayout>
        <UserDetails/>
      </DashBoardLayout>
    }/>
  },
  {
  path: "/DashBoard/Favorites",
  element: 
  <PrivateRoute element={
    <DashBoardLayout>
      <FavoriteProperties/>
    </DashBoardLayout>
  }/>
  },
  {
  path: "/DashBoard/MyProperties",
  element: 
  <PrivateRoute element={
    <DashBoardLayout>
      <UserProperties/>
    </DashBoardLayout>
  }/>
  },
  {
    path: "/DashBoard/PostProperty",
    element:
    <PrivateRoute element={
      <DashBoardLayout>
        <PostProperty/>
      </DashBoardLayout>
    }/>
  },
  {
    path: "/DashBoard/UpdateProperty/:id",
    element:
    <PrivateRoute element={
      <DashBoardLayout>
        <UpdateProperty/>
      </DashBoardLayout>
    }/>
  }
])