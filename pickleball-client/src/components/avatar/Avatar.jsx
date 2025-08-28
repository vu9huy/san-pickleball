

function Avatar({ svgString, borderRadius }) {
  const encodedSvg = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
  return (
    <img
      src={encodedSvg}
      alt="avatar"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: borderRadius
      }}
    />
  );
}


export default Avatar;