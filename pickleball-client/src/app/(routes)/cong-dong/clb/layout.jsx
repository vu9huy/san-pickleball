export async function generateMetadata() {
    return {
        title: "",
        description: ""
    };
}

export default function ClbLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}