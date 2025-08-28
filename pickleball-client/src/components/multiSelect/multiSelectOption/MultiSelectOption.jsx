import { components } from "react-select";

const MultiSelectOption = (props) => {
    return (
        <div>
            <components.Option {...props}>
                {/* <input
                    type="checkbox"
                    checked={props.isSelected}
                    disabled={true}
                    onChange={() => null}
                />{" "} */}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

export default MultiSelectOption;