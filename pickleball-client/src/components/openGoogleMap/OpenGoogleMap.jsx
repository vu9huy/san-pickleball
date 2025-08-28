import Link from "next/link";

const OpenGoogleMap = ({ lat, lng }) => {

    return (
        <Link className="link" target="_blank" rel="noopener noreferrer nofollow" style={{ padding: "8px 0px 4px", fontWeight: "600" }} href={`https://www.google.com/maps/dir//${lat},${lng}`} passHref={true}>
            Mở trong google map
        </Link>
    );
};

export default OpenGoogleMap;