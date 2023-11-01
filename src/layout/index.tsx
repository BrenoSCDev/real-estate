import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { IParent } from '../interfaces'

export const MainLayout: React.FC<IParent> = ({children}) => {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
