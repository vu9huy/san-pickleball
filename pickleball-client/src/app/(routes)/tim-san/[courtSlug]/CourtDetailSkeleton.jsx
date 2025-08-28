import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./page.module.css";
import skeletonStyles from "./CourtDetailSkeleton.module.css";

const CourtDetailSkeleton = () => {
    return (
        <div className={`${styles["court-detail-container"]} page-width`}>
            <div className={styles["court-detail-header"]}>
                <h1 className={styles["court-detail-header-title"]}><Skeleton height={32} /></h1>
            </div>
            <div className={styles["court-detail-body"]}>
                <div className={styles["court-detail-body-images"]}>
                    <Skeleton style={{ width: "100%", height: "100%" }} />
                    {/* <ReactResponsiveCarousel images={court.images} slideImageClass={"court-detail-slide"} isLazy={false} /> */}
                </div>
                <p className={styles["court-detail-body-description"]}><Skeleton count={2} /></p>
                <div className={styles["court-detail-body-info-wrapper"]}>
                    <div className={styles["court-detail-body-info-left"]}>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court address */}
                            <Skeleton height={20} width={80} />
                            <Skeleton count={1} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court number */}
                            <Skeleton height={20} width={150} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court available */}
                            <Skeleton height={20} width={150} />
                            <Skeleton count={2} width={200} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court surface */}
                            <Skeleton height={20} width={150} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court feature */}
                            <Skeleton height={20} width={100} />
                            <div className={skeletonStyles["skeleton-court-feature"]}>
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                            </div>
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court amenities */}
                            <Skeleton height={20} width={100} />
                            <div className={skeletonStyles["skeleton-court-amenities"]}>
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                                <Skeleton height={20} width={140} />
                            </div>
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court other amenities */}
                            <Skeleton height={20} width={100} />
                            <Skeleton height={20} width={200} />
                            <Skeleton height={20} width={200} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            {/* Court owner */}
                            <Skeleton height={20} width={120} />
                        </div>

                    </div>
                    <div className={styles["court-detail-body-info-right"]}>
                        {/* Map */}
                        <Skeleton style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
                <div className={styles["court-detail-body-info-block"]}>
                    {/* Court booking info */}
                    <Skeleton height={20} width={120} />
                </div>
                <div className={styles["court-detail-body-info-block"]}>
                </div>
            </div>
        </div>
    );
};
export default CourtDetailSkeleton;