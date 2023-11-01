import styled from "styled-components"

export const Container = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: fit-content;
  margin: 5em auto 5em auto;
  gap: 2em;
  flex-direction: row;
  margin-left: 3em;

  @media (max-width: 768px) {
    justify-content: center;
  }
`
export const TopContainer = styled.div`
display: flex;
flex-direction: row;
margin: 1rem 0 0 1rem;
gap: 1em;
justify-content: center;
`
export const ContainerTitle = styled.h1`
font-size: 16px;
`

export const PropertiesContainer = styled.div`
display: flex;
flex-direction: column;
height: fit-content;    
background-color: white;
border-radius: 1em;
margin: 2em 1em 1em 2em;
width: 90vw;
align-items: center;
align-content: center;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`
export const SelectedPropertyContainer = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
background-color: white;
border-radius: 1em;
margin: 2em 1em 1em 2em;
width: 60vw;
align-items: center;
justify-content: center;
`

export const NotListedContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
margin: 10em 0 0 0;
height: 60vh;
`
export const NotListedText = styled.h1`
color: #BABABA;
font-size: 16px;
`
export const CardContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: fit-content;
  margin: 5em auto 5em auto;
  gap: 2em;
  flex-direction: row;

  @media (max-width: 768px) {
    justify-content: center;
  }
`