import React from 'react'
import { DashboardHeader } from './components/dashboardHeader'
import Footer from '../../../layout/components/footer'
import { IParent } from '../../../interfaces'
import styled from "styled-components"


export const DashBoardLayout: React.FC<IParent> = ({children}) => {
  const Container = styled.div`
    display: flex;
  `
  return (
    <>
    <DashboardHeader/>
      <Container>
        {children}
      </Container>
    <Footer/>
    </>
  )
}
