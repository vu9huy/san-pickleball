import { globalConfig } from "@/config/globalConfig";

export const reactSelectCustomStyles = {
    container: (provided) => ({
        ...provided,
        marginBottom: "1rem"
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? "#e0e0e0" : "#ffffff",
        borderColor: state.isFocused ? globalConfig.primaryColor : "#d9d9d9",
        boxShadow: state.isFocused ? "0 0 0 1px #8ac93d" : null,
        "&:hover": {
            borderColor: state.isFocused ? globalConfig.primaryColor : "#b3b3b3"
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: "4px",
        marginTop: "0",
        boxShadow: "0 4px 11px rgba(0, 0, 0, 0.1)"
    }),
    // menuList: (provided) => ({
    //     ...provided,
    //     // border: "2px solid #ccc",
    //     padding: "0"
    // }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: "180px",
        overflowY: "auto",
        "::-webkit-scrollbar": {
            width: "6px",
            height: "10px"
        },
        "::-webkit-scrollbar-track": {
            "box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#8ac93d"
        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? globalConfig.primaryColor : state.isFocused ? "#f0f0f0" : "#ffffff",
        color: state.isSelected ? "#ffffff" : "#333333",
        "&:active": {
            backgroundColor: globalConfig.primaryColor,
            color: "#ffffff"
        }
    })

};

export const reactSelectTimeCustomStyles = {
    container: (provided) => ({
        ...provided,
        marginBottom: "1rem"
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? "#e0e0e0" : "#ffffff",
        borderColor: state.isFocused ? globalConfig.primaryColor : "#d9d9d9",
        boxShadow: state.isFocused ? "0 0 0 1px #8ac93d" : null,
        "&:hover": {
            borderColor: state.isFocused ? globalConfig.primaryColor : "#b3b3b3"
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: "4px",
        marginTop: "0",
        boxShadow: "0 4px 11px rgba(0, 0, 0, 0.1)"
    }),
    // menuList: (provided) => ({
    //     ...provided,
    //     // border: "2px solid #ccc",
    //     padding: "0"
    // }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: "180px",
        overflowY: "auto",
        "::-webkit-scrollbar": {
            width: "6px",
            height: "10px"
        },
        "::-webkit-scrollbar-track": {
            "box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#8ac93d"
        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? globalConfig.primaryColor : state.isFocused ? "#f0f0f0" : "#ffffff",
        color: state.isSelected ? "#ffffff" : "#333333",
        opacity: state.isDisabled ? 0.5 : 1,
        "&:active": {
            backgroundColor: globalConfig.primaryColor,
            color: "#ffffff"
        }
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        display: "none" // Hides the dropdown arrow and clear indicator
    })
};

