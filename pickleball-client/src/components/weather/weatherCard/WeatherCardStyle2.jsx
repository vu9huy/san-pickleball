import Image from "next/image";
import styles from "./WeatherCardStyle2.module.css";
import weatherConditions from "@/data/weather/weatherCode.json";
import uvIndexScale from "@/helpers/uvIndexScale";
import getDayOfWeek from "@/utils/time/getDayOfWeek";
import { formatDateCustom } from "@/utils/time/dateFns";
import { IconSprites1 } from "@/components/iconSprites/IconSprites";


const WeatherCardStyle2 = ({ weatherData }) => {

    const { province, weatherCode, minTemp, maxTemp, uv, date } = weatherData;
    const condition = weatherConditions[weatherCode];

    const newDate = formatDateCustom(new Date(date), "dd/MM/yyyy");
    const dayOfWeek = getDayOfWeek(new Date(date).getDay());

    return (
        <div className={styles["weather-card-container"]}>
            <div className={styles["weather-card-header"]}>
                <span className={styles["weather-card-date"]}>
                    <span className={styles["weather-card-day-of-week"]}>{dayOfWeek}</span>
                    <span className={styles["weather-card-date-date"]}>{newDate}</span>
                </span>
                <p className={styles["weather-card-province"]}>
                    {province === "Hồ Chí Minh" ? <p>Tp.</p> : null}
                    <p>{province}</p>
                </p>
            </div>
            <div className={styles["weather-card-body"]}>
                <div className={styles["weather-card-body-left"]}>
                    <span className={styles["weather-card-condition"]}>{condition.day.description}</span>
                    <div className={styles["weather-card-temp"]}>
                        <span className={styles["weather-card-min-temp"]}>Nhiệt độ: </span>
                        <span className={styles["weather-card-max-temp"]}>{minTemp}-{maxTemp}</span>
                    </div>
                    <div className={styles["weather-card-uv"]}>
                        <span className={styles["weather-card-uv-value"]}>
                            <span><IconSprites1 width="24px" height="24px" id="sprites-icon-uv" /></span>
                            {uv}
                        </span>
                        <span className={styles["weather-card-uv-risk"]}>({uvIndexScale(uv)})</span>
                    </div>
                </div>
                <div className={styles["weather-card-body-right"]}>
                    <div className={styles["weather-card-image"]}>
                        {/* <img  src={condition.day.image} alt={condition.day.description}/> */}
                        <Image fill src={condition.day.image} alt={condition.day.description} />
                    </div>
                </div>
            </div>
            {/* <div className={styles["weather-card-footer"]}>
            </div> */}
        </div>
    );
};

export default WeatherCardStyle2;
