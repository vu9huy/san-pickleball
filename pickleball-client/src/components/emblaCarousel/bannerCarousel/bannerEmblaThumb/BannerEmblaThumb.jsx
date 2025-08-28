import React from "react";
import "./BannerEmblaThumb.css";

export const BannerEmblaThumb = (props) => {
    const { selected, index, onClick } = props;

    return (
        <div
            className={"embla-thumbs__slide".concat(
                selected ? " embla-thumbs__slide--selected" : ""
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number"
            >
                {index + 1}
            </button>
        </div>
    );
};
