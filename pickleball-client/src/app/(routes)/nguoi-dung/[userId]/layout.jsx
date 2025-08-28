import UserNavigation from "@/components/userNavigation/UserNavigation";

export async function generateMetadata() {
    return {
        title: "Người dùng",
        description: ""
    };
}

export default function NguoiDungLayout({ children, params: { userId } }) {
    return (
        <>
            <UserNavigation userId={userId} />
            {children}
        </>
    );
}