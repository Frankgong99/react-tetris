import styled from "styled-components";

export const StyledDisplay = styled.div`
box-sizing: border-box;
display: flex;
align-items: center;
margin: 0 0  20px 0;
border: 4px solid #333;
min-height: 30px;
padding-left: 15px;
padding-top: 5px;
padding-bottom: 5px;
width: 100%;
border-radius: 20px;
color: ${props => (props.gameOver ? 'red' : '#999')};
background: #000;
font-family: 'Pixel Regular', Arial, Helvetica, sans-serif;
font-size: 1rem;
`