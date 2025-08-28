export async function generateMetadata() {
    return {
        title: "",
        description: ""
    };
}

export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    );
}