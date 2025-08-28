import React, { useCallback } from "react";

const MarkerControlPanel = ({ categories, onCategoryChange, setSelectedCourtKey }) => {
    const handleCategoryChange = useCallback(
        (e) => {
            setSelectedCourtKey(null);
            onCategoryChange(e.target.value || null);
        },
        [onCategoryChange]
    );
    return (
        <div className="control-panel marker-clustering-control-panel" style={{ position: "absolute", zIndex: "1", top: "20px", right: "20px", backgroundColor: "#fff" }}>
            <h3>Marker Clustering</h3>
            <p>
                <label>Filter Trees:</label>{" "}
                <select onChange={handleCategoryChange}>
                    <option value={""}>All trees</option>

                    {categories.map(category => (
                        <option key={category.key} value={category.key}>
                            {category.label} ({category.count})
                        </option>
                    ))}
                </select>
            </p>
        </div>
    );
};
export default MarkerControlPanel;