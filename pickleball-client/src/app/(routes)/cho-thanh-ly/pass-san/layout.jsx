export async function generateMetadata() {
    return {
        title: "",
        description: ""
    };
}

export default function PassSanLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}