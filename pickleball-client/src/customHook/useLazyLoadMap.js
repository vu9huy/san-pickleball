import React, { useEffect, useRef, useState } from "react";

const VisglMapContainer = React.lazy(() => import("@/components/googleMap/VisglMapProvider"));

const useLazyLoadMap = () => {
    const [isBottomVisible, setIsBottomVisible] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsBottomVisible(true);
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            },
            { threshold: 0.1 } // Adjust threshold as needed
        );

        if (bottomRef.current) observer.observe(bottomRef.current);

        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, []);


    return {
        isBottomVisible,
        bottomRef,
        VisglMapContainer
    };
};

export default useLazyLoadMap;