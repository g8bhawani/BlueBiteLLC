import styled from "styled-components";
import { flexbox, typography, space, color } from "styled-system";

export const Box = styled.div<{
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    mt?: string;
    ml?: string;
    margin?: string;
}>`
    display: flex;
    ${flexbox}
    ${space}
`;

export const BaseContainer = styled(Box)`
    width: 369px;
    height: 165px;
    border-radius: 25px;
    border: 1px solid #00000026;
    margin-bottom: 24px;
`;

export const Typography = styled.p<{ fontSize?: string; margin?: string; lineHeight?: string }>`
    font-family: Roboto;
    font-weight: 300;
    padding: 0;
    margin: 0;
    ${typography}
    ${space}
    ${color}
`;

export const ImageBox = styled.img``;

export const Loader = styled(Box)`
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 25px;
    height: 25px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
