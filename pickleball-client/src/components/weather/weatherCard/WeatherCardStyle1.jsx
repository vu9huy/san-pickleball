import styles from "./WeatherCardStyle1.module.css";
import weatherConditions from "@/data/weather/weatherCode.json";
import uvIndexScale from "@/helpers/uvIndexScale";
import getDayOfWeek from "@/utils/time/getDayOfWeek";
import { formatDateCustom } from "@/utils/time/dateFns";
import { IconSprites1 } from "@/components/iconSprites/IconSprites";


const WeatherCardStyle1Front = ({ weatherData }) => {
    const { province, weatherCode, maxTemp, uv, date } = weatherData;

    const condition = weatherConditions[weatherCode] ? weatherConditions[weatherCode] : weatherConditions["2"];

    const newDate = formatDateCustom(new Date(date), "dd/MM/yyyy");
    const dayOfWeek = getDayOfWeek(new Date(date).getDay());

    if (!condition) return null;

    return (
        <div className={styles["weather-card-container-front"]}>
            <div className={styles["weather-card-header"]}>
                <p className={styles["weather-card-province"]}>
                    {province === "Hồ Chí Minh" ? <span>Tp.</span> : null}
                    <span>{province}</span>
                </p>
                <span className={styles["weather-card-date"]}>{dayOfWeek}, {newDate}</span>
            </div>
            <div className={styles["weather-card-body"]}>
                <div className={styles["weather-card-image"]}>
                    {/* <img fill src={condition.day.image} alt={condition.day.description} /> */}
                    <img
                        src={condition.day.image}
                        alt={condition.day.description}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <span className={styles["weather-card-condition"]}>{condition.day.description}</span>
            </div>
            <div className={styles["weather-card-footer"]}>
                <div className={styles["weather-card-footer-left"]}>
                    <span className={styles["weather-card-uv"]}>
                        <span><IconSprites1 width="24px" height="24px" id="sprites-icon-uv" /> </span>
                        {uv}
                    </span>
                    {/* <span className={styles["weather-card-uv-risk"]}>{uvIndexScale(uv)}</span> */}
                </div>
                {/* <div className={styles["weather-card-footer-center"]}>

                </div> */}
                <div className={styles["weather-card-footer-right"]}>
                    {/* <span className={styles["weather-card-min-temp"]}>Min: {minTemp}</span> */}
                    <span className={styles["weather-card-max-temp"]}>{maxTemp}</span>
                </div>
            </div>
        </div>
    );
};

const WeatherCardStyle1Back = ({ weatherData }) => {
    const { weatherCode, minTemp, maxTemp, uv, precipitationProbability } = weatherData;
    const condition = weatherConditions[weatherCode] ? weatherConditions[weatherCode] : weatherConditions["2"];

    return (
        <div className={styles["weather-card-container-back"]}>
            <div className={styles["weather-card-header"]}>
                <h3 className={styles["weather-card-condition"]}>{condition.day.description}</h3>
            </div>
            <div className={styles["weather-card-body"]}>
                <div className={styles["weather-card-body-item"]}>
                    <span className={styles["weather-card-label"]}>
                        <p>Nhiệt độ</p>
                        <p>cao nhất</p>
                    </span>
                    <span className={styles["weather-card-value"]}>{maxTemp}</span>
                </div>
                <div className={styles["weather-card-body-item"]}>
                    <span className={styles["weather-card-label"]}>
                        <p>Nhiệt độ</p>
                        <p>thấp nhất</p>
                    </span>
                    <span className={styles["weather-card-value"]}>{minTemp}</span>
                </div>
                <div className={styles["weather-card-body-item"]}>
                    <span className={styles["weather-card-label"]}>
                        <p>Chỉ số UV</p>
                    </span>
                    <span className={styles["weather-card-value"]}>
                        <p>{uv}</p>
                        <p>({uvIndexScale(uv)})</p>
                    </span>
                </div>
                <div className={styles["weather-card-body-item"]}>
                    <span className={styles["weather-card-label"]}>
                        <p>Khả năng</p>
                        <p>có mưa</p>
                    </span>
                    <span className={styles["weather-card-value"]}>{precipitationProbability}</span>
                </div>
            </div>
            <div className={styles["weather-card-footer"]}>

            </div>
        </div>
    );
};

export { WeatherCardStyle1Front, WeatherCardStyle1Back };
