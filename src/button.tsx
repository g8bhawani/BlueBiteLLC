import React, { } from "react";
import styled from "styled-components";
import { Box, BaseContainer, Typography, ImageBox } from "./molecules";
import { ButtonOptions } from "./modals";

const Button: React.FC<ButtonOptions> = ({ text, variable, value, updateVariable }) => {
    const onButtonClick = () => {
        updateVariable(variable, value);
    };
    return (
        <ButtonCard justifyContent="space-between" onClick={onButtonClick}>
            <Box margin="24px" alignItems="flex-start">
                <Typography color="#FFFFFF" fontSize="24px" lineHeight="28.13px">
                    {text}
                </Typography>
            </Box>

            <Box margin="24px" alignItems="flex-end">
                <ImageBox
                    src={`/weather/${variable === "location" ? "location" : value}.png`}
                    alt={text}
                    width={48}
                    height={48}
                />
            </Box>
        </ButtonCard>
    );
};

export default Button;

const ButtonCard = styled(BaseContainer)`
    background: #2e71f0;
    cursor: pointer;
`;




