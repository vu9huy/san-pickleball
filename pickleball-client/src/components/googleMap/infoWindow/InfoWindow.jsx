// import CourtInfoWindow from "@/components/courtInfoWindow/CourtInfoWindow";
// import { InfoWindow } from "@vis.gl/react-google-maps";

// const VisglInfoWindow = ({ selectedCourtKey, markers, handleInfoWindowClose, selectedCourt, handleZoomCourt }) => {

//     return (
//         <>
//             {selectedCourtKey && (
//                 <InfoWindow
//                     anchor={markers[selectedCourtKey]}
//                 // onCloseClick={handleInfoWindowClose}
//                 >
//                     <CourtInfoWindow court={selectedCourt} handleZoom={handleZoomCourt} handleInfoWindowClose={handleInfoWindowClose} />
//                 </InfoWindow>
//             )}</>
//     );
// };

// export default VisglInfoWindow;


// In your InfoWindow.jsx
import dynamic from 'next/dynamic';
import { InfoWindow } from "@vis.gl/react-google-maps";

// Dynamic import with loading component
const CourtInfoWindowAsync = dynamic(
    () => import('@/components/courtInfoWindow/CourtInfoWindow'),
    {
        loading: () => <div style={{ padding: '20px' }}>Loading...</div>,
        ssr: false // Important for client-side only components
    }
);

const VisglInfoWindow = ({ selectedCourtKey, markers, handleInfoWindowClose, selectedCourt, handleZoomCourt }) => {
    return (
        <>
            {selectedCourtKey && (
                <InfoWindow anchor={markers[selectedCourtKey]}>
                    <CourtInfoWindowAsync
                        court={selectedCourt}
                        handleZoom={handleZoomCourt}
                        handleInfoWindowClose={handleInfoWindowClose}
                    />
                </InfoWindow>
            )}
        </>
    );
};

export default VisglInfoWindow;