"use client";

import ReactQueryProvider from "@/libs/reactQuery/ReactQueryProvider";

const Provider = ({ children }) => {

    return (
        <div className="">
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </div>
    );
};

export default Provider;
