// import Image from "next/image";
import styles from "./CourtCard.module.css";
import CourtDescription from "../courtInfoComponents/courtDescription/CourtDescription";
import Link from "next/link";
import { convertVietNamMoneyFormat } from "@/utils/others/convertMoneyFormat";

const CourtCard = ({ court }) => {

    return (
        <div className={styles["court-card-container"]}>
            <div className={styles["court-card__images"]}>
                <img src={court.images[0]?.url || court.googlePlaceImages[0]?.url} alt={`${court?.name}`} />
                <img src={court.images[1]?.url || court.googlePlaceImages[1]?.url} alt={`${court?.name}`} loading="lazy" />
                {/* <Image src={court.images[0]?.url} alt={`${court?.name}`} fill />
                <Image src={court.images[1]?.url} alt={`${court?.name}`} fill loading="lazy" /> */}
            </div>
            <div className={styles["court-card__info"]}>
                <div className={styles["court-card__content"]}>
                    <Link href={`/tim-san/${court.slug}`} /* prefetch={false} */><h2 className={styles["court-card__name"]}>{court?.name}</h2></Link>
                    <div className={styles["court-card__description"]}>
                        <CourtDescription description={court?.description} />
                    </div>
                    <p className={styles["court-card__address"]}>
                        <span className={styles["court-card__label"]}>Địa chỉ: </span>
                        {court?.location?.address}
                    </p>
                    <p className={styles["court-card__pricing"]}>
                        <span className={styles["court-card__label"]}>Giá: </span>
                        <span className={styles["court-card__pricing-min"]}>{convertVietNamMoneyFormat(court.bookingInfo.priceRange.min)}</span> - <span className={styles["court-card__pricing-max"]}>{convertVietNamMoneyFormat(court.bookingInfo.priceRange.max)}</span> VND
                    </p>
                </div>
                <Link /* prefetch={false} */ href={`/tim-san/${court.slug}`} className={`${styles["court-card__button"]} button`}>
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
};
export default CourtCard;
