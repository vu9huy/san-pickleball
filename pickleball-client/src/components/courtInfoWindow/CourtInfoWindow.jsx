// import styles from "./CourtInfoWindow.module.css";
// import Link from "next/link";
// import ReactResponsiveCarousel from "../slider/ReactResposiveCarousel";
// import OpenGoogleMap from "../openGoogleMap/OpenGoogleMap";
// import CourtNumber from "../courtInfoComponents/courtNumber/CourtNumber";
// import CourtPrice from "../courtInfoComponents/courtPrice/CourtPrice";
// import CourtAvailable from "../courtInfoComponents/courtAvailable/CourtAvailable";
// import { getCourtBySlugFetchingFunc } from "@/api/serverApi/fetchFunc";

// // displayType: listitem, infowindow

// const CourtInfoWindow = async ({ court, handleInfoWindowClose, handleZoom, displayType = "mapwindow" }) => {

//     let courtData = court;
//     const checkListItemType = displayType === "listitem";
//     const checkMapWindowType = displayType === "mapwindow";

//     if(displayType === "mapwindow"){
//         const slug = court?.slug;
//         // console.log("slug434343", slug);
//         const response = await getCourtBySlugFetchingFunc(slug);
//         courtData = response?.data || {};
//     }

//     const handleScrollToMap = () => {
//         window.scrollTo({
//             top: document.documentElement.scrollHeight - 1350,
//             behavior: "smooth"
//         });
//     };

//     return (
//         <div className={`${styles["court-info-window-container"]} ${styles[displayType]}`}>
//             {handleInfoWindowClose ?
//                 <div className={styles["court-info-window-close-button"]} onClick={handleInfoWindowClose}>
//                     <p>+</p>
//                 </div> :
//                 ""}
//             <div className={styles["court-info-window-header"]} >
//                 <h2 className={styles["court-info-window-title"]}>{courtData?.name}</h2>
//             </div>

//             <div className={`${styles["court-info-window-body"]} ${styles[displayType]} custom-scroll-bar`}>
//                 <div className={`${styles["court-info-window-box-1"]} ${styles[displayType]}`}>
//                     <div className={styles["court-info-window-button-group"]}>
//                         <Link className={styles["court-info-window-google-map-link"]} target="_blank" rel="noopener noreferrer" href={`/tim-san/${courtData.slug}`} passHref={true}>
//                             <button className={`${styles["court-info-window-go-to-court"]} button`}>Xem chi tiết</button>
//                         </Link>
//                         {checkListItemType ?
//                             <button className={`${styles["court-info-window-view-in-map"]} button`} onClick={handleScrollToMap}>
//                                 Xem bản đồ
//                             </button> : ""}
//                     </div>

//                     <p className={styles["court-info-window-description"]}>
//                         <span className={styles["court-info-window-label"]}>Mô tả: </span>
//                         <span>{courtData?.description}</span>
//                     </p>
//                     <div className={styles["court-info-window-available"]}>
//                         <CourtAvailable availability={courtData?.availability} />
//                     </div>
//                     <div className={styles["court-info-window-courts-number"]}>
//                         <CourtNumber number={courtData?.numberOfCourts} />
//                     </div>
//                     <div className={styles["court-info-window-courts-price"]}>
//                         <CourtPrice bookingInfo={courtData?.bookingInfo} />
//                     </div>
//                 </div>

//                 <div className={`${styles["court-info-window-box-2"]} ${styles[displayType]}`}>
//                     <div className={styles["court-info-window-images-list"]}>
//                         <ReactResponsiveCarousel images={[...courtData?.images, ...courtData?.googlePlaceImages]} slideImageClass={"infowindow-slide"} displayType={displayType} isLazy={true} />
//                     </div>
//                     {/* {checkMapWindowType ?
//                         <OpenGoogleMap lat={court?.geolocation?.latitude} lng={court?.geolocation?.longitude} /> :
//                         ""} */}
//                     {handleZoom ?
//                         <button className={`${styles["court-info-window-google-map-zoom-button"]} button`} onClick={() => handleZoom(courtData)}>Zoom gần</button> :
//                         ""}
//                 </div>
//             </div>
//         </div >
//     );
// };
// export default CourtInfoWindow;


import styles from "./CourtInfoWindow.module.css";
import Link from "next/link";
import ReactResponsiveCarousel from "../slider/ReactResposiveCarousel";
import OpenGoogleMap from "../openGoogleMap/OpenGoogleMap";
import CourtNumber from "../courtInfoComponents/courtNumber/CourtNumber";
import CourtPrice from "../courtInfoComponents/courtPrice/CourtPrice";
import CourtAvailable from "../courtInfoComponents/courtAvailable/CourtAvailable";
import { getCourtBySlugFetchingFunc } from "@/api/serverApi/fetchFunc";

// displayType: listitem, infowindow

const CourtInfoWindow = async ({ court, handleInfoWindowClose, handleZoom, displayType = "mapwindow" }) => {

    let courtData = court;
    const checkListItemType = displayType === "listitem";
    const checkMapWindowType = displayType === "mapwindow";

    if(displayType === "mapwindow"){
        const slug = court?.slug;
        // console.log("slug434343", slug);
        const response = await getCourtBySlugFetchingFunc(slug);
        courtData = response?.data || {};
    }

    const handleScrollToMap = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight - 1350,
            behavior: "smooth"
        });
    };

    // Create a unique key for the carousel based on court data
    const carouselKey = `carousel-${courtData?.id || courtData?.slug || court?.key || Math.random()}`;

    return (
        <div className={`${styles["court-info-window-container"]} ${styles[displayType]}`}>
            {handleInfoWindowClose ?
                <div className={styles["court-info-window-close-button"]} onClick={handleInfoWindowClose}>
                    <p>+</p>
                </div> :
                ""}
            <div className={styles["court-info-window-header"]} >
                <h2 className={styles["court-info-window-title"]}>{courtData?.name}</h2>
            </div>

            <div className={`${styles["court-info-window-body"]} ${styles[displayType]} custom-scroll-bar`}>
                <div className={`${styles["court-info-window-box-1"]} ${styles[displayType]}`}>
                    <div className={styles["court-info-window-button-group"]}>
                        <Link className={styles["court-info-window-google-map-link"]} /* target="_blank" rel="noopener noreferrer" */ href={`/tim-san/${courtData.slug}`} passHref={true}>
                            <button className={`${styles["court-info-window-go-to-court"]} button`}>Xem chi tiết</button>
                        </Link>
                        {checkListItemType ?
                            <button className={`${styles["court-info-window-view-in-map"]} button`} onClick={handleScrollToMap}>
                                Xem bản đồ
                            </button> : ""}
                    </div>

                    <p className={styles["court-info-window-description"]}>
                        <span className={styles["court-info-window-label"]}>Mô tả: </span>
                        <span>{courtData?.description}</span>
                    </p>
                    <div className={styles["court-info-window-available"]}>
                        <CourtAvailable availability={courtData?.availability} />
                    </div>
                    <div className={styles["court-info-window-courts-number"]}>
                        <CourtNumber number={courtData?.numberOfCourts} />
                    </div>
                    <div className={styles["court-info-window-courts-price"]}>
                        <CourtPrice bookingInfo={courtData?.bookingInfo} />
                    </div>
                </div>

                <div className={`${styles["court-info-window-box-2"]} ${styles[displayType]}`}>
                    <div className={styles["court-info-window-images-list"]}>
                        <ReactResponsiveCarousel 
                            key={carouselKey}
                            images={[...courtData?.images, ...courtData?.googlePlaceImages]} 
                            slideImageClass={"infowindow-slide"} 
                            displayType={displayType} 
                            isLazy={true} 
                        />
                    </div>
                    {/* {checkMapWindowType ?
                        <OpenGoogleMap lat={court?.geolocation?.latitude} lng={court?.geolocation?.longitude} /> :
                        ""} */}
                    {handleZoom ?
                        <button className={`${styles["court-info-window-google-map-zoom-button"]} button`} onClick={() => handleZoom(courtData)}>Zoom gần</button> :
                        ""}
                </div>
            </div>
        </div >
    );
};
export default CourtInfoWindow;