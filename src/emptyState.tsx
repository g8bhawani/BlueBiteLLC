import React, { } from "react";
import styled from "styled-components";
import { BaseContainer, Typography, Loader } from "./molecules";

interface EmptyStateOptions {
    text?: string;
    loading?: boolean;
}

const EmptyState: React.FC<EmptyStateOptions> = ({ text = "", loading = false }) => {
    return (
        <EmptyContainer>
            {text && (
                <Typography fontSize="24px" lineHeight="28.13px">
                    {text}
                </Typography>
            )}
            {loading && <Loader />}
        </EmptyContainer>
    );
};

export default EmptyState;
const EmptyContainer = styled(BaseContainer)`
    cursor: wait;
    align-items: center;
    justify-content: center;
`;
