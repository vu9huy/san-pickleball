import BlogCard from "../blogCard/BlogCard";
import styles from "./BlogList.module.css";

const BlogList = ({ blogList }) => {

    return (
        <div className={styles["blog-list-container"]}>
            <div className={styles["blog-list-wrapper"]}>
                {blogList?.map((blog, index) => <BlogCard key={index} post={blog} blogType={index === 0 ? "featured" : "normal"} />)}
            </div>
        </div >
    );
};
export default BlogList;