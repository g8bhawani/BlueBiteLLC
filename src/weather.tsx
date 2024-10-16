import React, { useEffect, useState } from "react";
import { Box, BaseContainer, Typography, ImageBox } from "./molecules";
import EmptyState from './emptyState'
import { WeatherOptions } from "./modals";

const API_BASE_URL = "http://localhost:3030/";

interface WeatherData {
    condition: string;
    conditionName: string;
    temperature: number;
    unit: string;
    location: string;
    upcomming?: {
        condition: string;
        conditionName: string;
        day: string;
    }[];
}

const Weather: React.FC<WeatherOptions> = ({ lat = "", lon = "" }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const getWeatherData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${API_BASE_URL}integration/weather?` +
                    new URLSearchParams({
                        lat,
                        lon,
                    }).toString()
                );
                if (res.ok) {
                    const result = await res.json();
                    setWeatherData(result.data);
                    setLoading(false);
                } else {
                    throw new Error(`Error occurred - ${res.status}`);
                }
            } catch (e) {
                console.error(e, "error occured while loading the weather");
                setLoading(false);
                setWeatherData(null);
            }
        }
        getWeatherData();
    }, [lat, lon]);

    // display the loading page
    if (loading || !weatherData) {
        return <EmptyState loading />;
    }

    return (
        <BaseContainer justifyContent="space-between">
            <Box alignItems="flex-start" mt="24px" ml="24px">
                <Box>
                    <ImageBox
                        src={`/weather/${weatherData.condition}.png`}
                        alt={weatherData.conditionName}
                        width={72}
                        height={72}
                    />
                </Box>

                <Box flexDirection="column" justifyContent="center">
                    <Typography fontSize="36px" lineHeight="42.19px">
                        {weatherData.temperature}&deg;{weatherData.unit.toUpperCase()}
                    </Typography>
                    <Typography fontSize="14px" lineHeight="16.41px">
                        {weatherData.conditionName}
                    </Typography>
                </Box>
            </Box>

            <Box
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-end"
                margin="24px"
            >
                <Typography fontSize="14px" lineHeight="16.41px">
                    {weatherData.location}
                </Typography>
                <Box>
                    {weatherData.upcomming &&
                        weatherData.upcomming.map(
                            (data: { condition: string; conditionName: string; day: string }) => (
                                <Box flexDirection="column" alignItems="center">
                                    <ImageBox
                                        src={`/weather/${data.condition}.png`}
                                        alt={data.conditionName}
                                        width={48}
                                        height={48}
                                    />
                                    <Typography fontSize="14px" lineHeight="16.41px">
                                        {data.day}
                                    </Typography>
                                </Box>
                            )
                        )}
                </Box>
            </Box>
        </BaseContainer>
    );
};

export default Weather
