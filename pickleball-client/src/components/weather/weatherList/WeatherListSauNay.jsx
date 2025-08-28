import WeatherCard from "../weatherCard/WeatherCardStyle1";
import styles from "./WeatherList.module.css";

const WeatherList = ({ }) => {
    const weatherData = [
        {
            city: "Los Angeles",
            temperature: 31,
            condition: "sunny",
            minTemp: 24,
            maxTemp: 31,
            backgroundColor: "linear-gradient(135deg, #4facfe, #00f2fe)"
        },
        {
            city: "New York",
            temperature: 25,
            condition: "cloudy",
            minTemp: 15,
            maxTemp: 25,
            backgroundColor: "linear-gradient(135deg, #fbc2eb, #a18cd1)"
        },
        {
            city: "Seattle",
            temperature: -10,
            condition: "snow",
            minTemp: -18,
            maxTemp: -10,
            backgroundColor: "linear-gradient(135deg, #cfd9df, #e2ebf0)"
        },
        {
            city: "New York",
            temperature: 25,
            condition: "rainy",
            minTemp: 15,
            maxTemp: 25,
            backgroundColor: "linear-gradient(135deg, #fbc2eb, #a18cd1)"
        },
        {
            city: "Seattle",
            temperature: -10,
            condition: "clear",
            minTemp: -18,
            maxTemp: -10,
            backgroundColor: "linear-gradient(135deg, #cfd9df, #e2ebf0)"
        },
        {
            city: "New York",
            temperature: 25,
            condition: "storm",
            minTemp: 15,
            maxTemp: 25,
            backgroundColor: "linear-gradient(135deg, #fbc2eb, #a18cd1)"
        },
        {
            city: "Seattle",
            temperature: -10,
            condition: "fog",
            minTemp: -18,
            maxTemp: -10,
            backgroundColor: "linear-gradient(135deg, #cfd9df, #e2ebf0)"
        }
        // Add more items as needed
    ];

    const getBackgroundColor = (condition) => {
        switch (condition) {
        case "sunny":
            return "linear-gradient(to left top, #FF8E02, #FFA41D, #FFBF3C)";
        case "cloudy":
            return "linear-gradient(to left top, #00A7C9, #00BEE3, #00D5FF)";
        case "snow":
            return "linear-gradient(to left top, #55A4CF, #76BFE0, #97D9EF)";
        case "rainy":
            return "linear-gradient(to left top, #00355D, #014478, #005190)";
        case "clear":
            return "linear-gradient(to left top, #3E275D, #503374, #62408D)";
        case "storm":
            return "linear-gradient(to left top, #625A83, #766D9B, #897FB3)";
        case "fog":
            return "linear-gradient(to left top, #01A18F, #08B285, #13C57B)";
        default:
            return "linear-gradient(to left top, #00A7C9, #00BEE3, #00D5FF)";
        }
    };

    return (
        <div className={styles["weather-list-container"]} >
            {weatherData.map((weather, index) => (
                <WeatherCard key={index} {...weather} backgroundColor={getBackgroundColor(weather.condition)} />
            ))}
        </div>
    );
};

export default WeatherList;
