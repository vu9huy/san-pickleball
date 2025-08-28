import toSlug from "@/utils/others/toSlug";
import styles from "./BlogCard.module.css";
import Link from "next/link";
import Tag from "@/components/tag/Tag";

const BlogCard = (props) => {

    const { post, blogType } = props;
    const blogTagStr = post?.tag;
    const blogTagArr = blogTagStr?.split(", ") || [];

    return (
        <div className={`${styles["blog-card-container"]} ${styles[blogType]}`}>
            <div className={styles["blog-card"]}>
                <div className={styles["blog-image"]} >
                    <img src={post.image} alt="Blog" />
                    <Link className={`${styles["blog-card-link"]} unstyled`} href={`/blogs/${post.slug}`}></Link>
                </div>
                <div className={styles["blog-content"]}>
                    <span className={styles["blog-tags-list"]}>{blogTagArr.map((blogTag, index) => <Tag key={index} url={`/blogs/tags/${toSlug(blogTag)}`} tagType={"blog"} tagName={blogTag} />)}</span>
                    <h3 className={styles["blog-title"]}>
                        <Link className="unstyled" href={`/blogs/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <span className={styles["blog-time"]}>{post.time}</span>
                </div>
            </div>
        </div >
    );
};
export default BlogCard;