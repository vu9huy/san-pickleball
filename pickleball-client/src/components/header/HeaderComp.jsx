import { barlow_condensed } from "@/fonts/googleFont";

export const HeaderComp = ({ children }) => {

    return (
        <span className={barlow_condensed.className}>{children}</span>
    );
};
