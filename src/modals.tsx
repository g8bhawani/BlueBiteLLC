export interface WeatherOptions {
    lat?: string;
    lon?: string;
}

export interface ButtonOptions {
    text: string;
    variable: string;
    value: string;
    updateVariable: (key: string, value: string) => void;
}