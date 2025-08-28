import Link from "next/link";

const ExternalLink = ({ href }) => {

    return <Link target="_blank" rel="nofollow noopener noreferrer" href={href} />;
};
export default ExternalLink;