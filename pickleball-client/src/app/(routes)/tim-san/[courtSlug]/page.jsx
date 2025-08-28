import styles from "./page.module.css";
import ReactResponsiveCarousel from "@/components/slider/ReactResposiveCarousel";
import NotFoundComp from "@/components/error/notFound/NotFoundComp";
import ServerError from "@/components/error/serverError/ServerError";
import CourtAddress from "@/components/courtInfoComponents/courtAddress/CourtAddress";
import CourtNumber from "@/components/courtInfoComponents/courtNumber/CourtNumber";
import CourtAvailable from "@/components/courtInfoComponents/courtAvailable/CourtAvailable";
import CourtUtilities from "@/components/courtInfoComponents/courtUtilities/CourtUtilities";
import CourtPrice from "@/components/courtInfoComponents/courtPrice/CourtPrice";
import CourtOwner from "@/components/courtInfoComponents/courtOwner/CourtOwner";
import CourtBooking from "@/components/courtInfoComponents/courtBooking/CourtBooking";
import generateMapUrl from "@/utils/userdata/generateMapUrl";
import OpenGoogleMap from "@/components/openGoogleMap/OpenGoogleMap";
import CourtSurface from "@/components/courtInfoComponents/courtSurface/CourtSurface";
import CourtAmenities from "@/components/courtInfoComponents/courtAmenities/CourtAmenities";
import CourtFeature from "@/components/courtInfoComponents/courtFeature/CourtFeature";
// import { useGetCourtBySlugFetchingApi, useGetGooglePlaceByPlaceFetchingId } from "@/api/serverApi/callApi";
// import CourtDetailSkeleton from "./CourtDetailSkeleton";
import CourtSocial from "@/components/courtInfoComponents/courtSocial/CourtSocial";
// import { use } from "react";
import { getCourtBySlugFetchingFunc } from "@/api/serverApi/fetchFunc";
import dynamic from "next/dynamic";

const FacebookShare = dynamic(() => import("@/components/socialShare/facebookShare/FacebookShare"), {
    ssr: false
});

const CourtDetail = async ({ params: { courtSlug } }) => {

    // const { data: response, isPending, /* isError, refetch: refetchGetCourtById  */ } = useGetCourtBySlugFetchingApi(courtSlug);
    // const responseStatus = response?.status;

    const response = await getCourtBySlugFetchingFunc(courtSlug);

    const court = response?.data || {};

    const mapUrl = generateMapUrl(court?.geolocation?.latitude, court?.geolocation?.longitude);

    const googlePlaceImages = court?.googlePlaceImages || [];
    const courtImages = court?.images || [];

    const images = [...courtImages, ...googlePlaceImages];
    if (court?.images) {
        images.push(...court?.images);
    }

    // if (isPending) return <CourtDetailSkeleton />;
    // if (responseStatus === 404 && !isPending) return <NotFoundComp type={"court"} />;
    // if ((!response || responseStatus >= 500) && !isPending) return <ServerError />;

    return (
        <div className={`${styles["court-detail-container"]} page-width`}>
            <div className={styles["court-detail-header"]}>
                <h1 className={styles["court-detail-header-title"]}>{court.name}</h1>
            </div>
            <FacebookShare />
            <div className={styles["court-detail-body"]}>
                <div className={styles["court-detail-body-images"]}>
                    <ReactResponsiveCarousel images={images} slideImageClass={"court-detail-slide"} isLazy={false} />
                </div>
                <p className={styles["court-detail-body-description"]}>{court.description}</p>
                <div className={styles["court-detail-body-info-wrapper"]}>
                    <div className={styles["court-detail-body-info-left"]}>
                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtAddress
                                address={court.location.address}
                                district={court.location.district}
                                province={court.location.province}
                                lat={court?.geolocation?.latitude}
                                lng={court?.geolocation?.longitude}
                            />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtNumber number={court.numberOfCourts} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtAvailable availability={court.availability} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtSurface surface={court.surface} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtFeature features={court.feature} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtAmenities amenities={court.amenities} />
                        </div>

                        {/* <div className={styles["court-detail-body-info-block"]}>
                            <CourtUtilities utilities={court.utilities} />
                        </div> */}

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtOwner owner={court?.owner} />
                        </div>

                        <div className={styles["court-detail-body-info-block"]}>
                            <CourtSocial social={court.social} />
                        </div>

                    </div>
                    <div className={styles["court-detail-body-info-right"]}>
                        <div className={styles["court-detail-body-info-map-wapper"]}>
                            <iframe className={styles["court-detail-body-info-map-embed"]} src={mapUrl} width="600" height="450" style={{ "border": "0px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div className={styles["court-detail-body-info-open-map"]}>
                                <OpenGoogleMap
                                    lat={court?.geolocation?.latitude}
                                    lng={court?.geolocation?.longitude} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["court-detail-body-info-block"]}>
                    <CourtPrice bookingInfo={court.bookingInfo} />
                </div>

                <div className={styles["court-detail-body-info-block"]}>
                    <CourtBooking courtId={court.id} numberOfCourts={court.numberOfCourts} availability={court.availability} />
                </div>
            </div>
        </div>
    );
};
export default CourtDetail;