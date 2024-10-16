import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Box, BaseContainer, Typography, ImageBox } from "./molecules";
import Weather from "./weather";
import Button from "./button";
import EmptyState from "./emptyState";
import { WeatherOptions, ButtonOptions } from "./modals";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3030/";

const COMPONENT_TYPES: { [key: string]: any } = {
    image: "image",
    weather: "weather",
    button: "button",
    condition: "condition",
};

// interface Variables
interface ImageOptions {
    src?: string;
    alt?: string;
}
interface Component {
    id: number;
    type: string;
    options: ImageOptions & WeatherOptions & ButtonOptions;
    children?: number;
}
interface PageData {
    lists: {
        id: number;
        components: number[];
    }[];
    components: Component[];
    variables?: {
        name: string;
        type: string;
        initialValue: string | number;
    }[];
}
const App = () => {
    const { id } = useParams<{ id: string }>();

    const [pageData, setPageData] = useState<PageData>({ lists: [], components: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [variables, setVariables] = useState<Record<string, string>>({});

    const updateVariable = useCallback((key: string, value: string) => {
        setVariables((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    // get the page API data
    useEffect(() => {
        const getPageData = async () => {
            try {
                // initiate the loader during the page refresh
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}page/${id}`);
                if (res.ok) {
                    const result = await res.json();

                    const { data } = result;
                    setPageData({ lists: data.lists, components: data.components });
                    setLoading(false);

                    // store all variables in the format of Array<{key:value}>
                    if (data.variables) {
                        const variablesList: Record<string, string> = {};
                        data.variables.forEach((item: { name: string; initialValue: string }) => {
                            variablesList[item.name] = item.initialValue;
                        });
                        setVariables(variablesList);
                    }
                } else {
                    throw new Error(`Error occurred - ${res.status}`);
                }
            } catch (e) {
                console.error(e, "error occured");
                setLoading(false);
            }
        };
        getPageData();
    }, [id]);

    const { components, lists } = pageData;

    const getComponentDetails = (id: number) => {
        const componentDetails = components.find((item) => item.id === id);
        if (!componentDetails?.type) {
            return <EmptyState text="No Component Found" />;
        }
        switch (componentDetails.type) {
            case COMPONENT_TYPES.image: {
                return <Image {...componentDetails?.options} />;
            }
            case COMPONENT_TYPES.weather: {
                return <Weather {...componentDetails?.options} />;
            }
            case COMPONENT_TYPES.button: {
                return <Button {...componentDetails?.options} updateVariable={updateVariable} />;
            }
            case COMPONENT_TYPES.condition: {
                return processCondition(componentDetails);
            }
            default:
                return <EmptyState text="No Component Found" />;
        }
    };

    interface Condition {
        options: {
            variable: string;
            value: string;
        };
        children?: number; // Assuming children is an ID referencing a list
    }
    const processCondition = (conditionDetails: Condition): React.ReactNode[] | null => {
        const { variable, value } = conditionDetails.options;

        // render check
        if (variables[variable] === value) {
            const { children } = conditionDetails;
            const childrenLists = pageData.lists.find((list) => list.id === children);
            if (!childrenLists?.components) {
                return null;
            }
            return childrenLists.components.map((childId: number) => {
                return getComponentDetails(childId);
            });
        }
        return null;
    };

    const defaultComponent = useMemo(() => lists.find((list) => list.id === 0), [lists]);

    if (loading) {
        return (
            <Container>
                <EmptyState loading />
            </Container>
        );
    }
    return (
        <Container>
            <Box margin="10px">
                <Link to="/">
                    <Typography fontSize="20px" lineHeight="42.19px">
                        Back
                    </Typography>
                </Link>
            </Box>
            {!!defaultComponent?.components.length ? (
                defaultComponent.components.map((componentId) => {
                    const component = getComponentDetails(componentId);
                    return component;
                })
            ) : (
                <EmptyState text="No Component Added" />
            )}
        </Container>
    );
};

export default App;

const Image: React.FC<ImageOptions> = (props) => {
    return (
        <ImageContainer>
            <ImageBox {...props} width="369px" height="165px" />
        </ImageContainer>
    );
};

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ImageContainer = styled(BaseContainer)`
    background: #2e71f0;
    overflow: hidden;
`;
