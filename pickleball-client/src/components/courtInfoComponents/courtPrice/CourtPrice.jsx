import { convertVietNamMoneyFormat } from "@/utils/others/convertMoneyFormat";
import styles from "./CourtPrice.module.css";
import ImageModal from "@/components/imageModal/ImageModal";

const CourtPrice = ({ bookingInfo }) => {

    return (
        <div className={styles["court-price-container"]}>
            <p className={styles["court-detail-body-info-block-label"]}>
                <span className={styles["court-detail-body-info-block-fake-icon"]}>$</span>
                <span>&nbsp;&nbsp;Giá:</span>
                <span>&nbsp;{convertVietNamMoneyFormat(bookingInfo?.priceRange?.min || 0)}đ - {convertVietNamMoneyFormat(bookingInfo?.priceRange?.max || 0)}đ</span>
            </p>
            {bookingInfo?.images?.length > 0 ?
                <div className={styles["court-price-images-wrapper"]}>
                    {/* <p>Bảng giá chi tiết:</p> */}
                    <div className={styles["court-price-detail-link"]}>
                        <ImageModal
                            trigger={<span className={styles["view-detail-text"]}>Xem chi tiết</span>}
                            modalContent={
                                <img
                                    src={bookingInfo?.images[0]?.url}
                                    alt={bookingInfo?.images[0]?.alt}
                                    className={styles["modal-image"]}
                                />
                            }
                        />
                    </div>
                </div>
                : ""}
        </div>
    );
};

export default CourtPrice;