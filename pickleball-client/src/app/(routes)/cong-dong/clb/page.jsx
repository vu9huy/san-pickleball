import styles from "./page.module.css";

// export async function generateMetadata() {
//     return {
//         title: product.title,
//         description: product.body
//     };
// }

export default function Clb() {

    return <div className={`${styles["clb-container"]} page-width`}>
        Câu lạc bộ
    </div>;
}
