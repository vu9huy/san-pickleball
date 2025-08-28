import ReactSelect from "react-select";
import styles from "./MultiSelect.module.css";
import { useState } from "react";
import MultiSelectOption from "./multiSelectOption/MultiSelectOption";

const MultiSelect = ({ options, defaultValue, placeholder = "Lựa chọn", noOptionsMessage = "Không còn lựa chọn", selectHandler }) => {
    const [selected, setSelected] = useState(defaultValue || null);
    const handleChange = (selected) => {
        setSelected(selected);
        selectHandler(selected);
    };

    return (
        <div className={styles["multi-select-container"]}>
            <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option: MultiSelectOption
                }}
                onChange={handleChange}
                value={selected}
                placeholder={placeholder}
                noOptionsMessage={() => noOptionsMessage}

                // Hide dropdown list  when select any item
                // closeMenuOnSelect={true}

            //Selected Item Remove in dropdown list
            // hideSelectedOptions={true}
            />
        </div>
    );
};

export default MultiSelect;