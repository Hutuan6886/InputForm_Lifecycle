import styled from 'styled-components'
//----------------button-------------------
export const ButtonGreen = styled.button`
    apperance:none;
    background-color: ${props => props.theme.btnBgColorGreen};
    color: ${props => props.theme.btnColor};
    border: ${props => props.theme.borderGreen};
    border-radius: 5px;
    padding: .25em .5em;
    transition: all .5s;
    font-size:17px;
    &:hover {
        color: ${props => props.theme.btnColorGreenHover};
        background-color:${props => props.theme.btnBgColorGreenHover};
        border: ${props => props.theme.borderGreenHover};
    };
    &:focus {
        outline: none
    }
    // * Css cho disabled
    &:disabled{
        cursor: no-drop;
    }
`;


export const ButtonRed = styled(ButtonGreen)`
    background-color: ${props => props.theme.btnBgColorRed};
    border: ${props => props.theme.borderRed};
    &:hover {
        color: ${props => props.theme.btnColorRedHover};
        background-color:${props => props.theme.btnBgColorRedHover};
        border: ${props => props.theme.borderRedHover};
    };
`;