import styles from "./GuideCard.module.css";
import toSlug from "@/utils/others/toSlug";
import Link from "next/link";
import Tag from "@/components/tag/Tag";

const GuideCard = (props) => {

    const { post, guideType } = props;
    const guideTagStr = post?.tag;
    const guideTagArr = guideTagStr?.split(", ") || [];


    return (
        <div className={`${styles["guide-card-container"]} ${styles[guideType]}`}>
            {/* <Link className="unstyled" href={`/blogs/${post.slug}`}> */}
            <div className={styles["guide-card"]}>
                <div className={styles["guide-image"]} >
                    <img src={post.image} alt="Blog" />
                    <Link className={`${styles["guide-card-link"]} unstyled`} href={`/huong-dan/${post.slug}`}></Link>
                </div>
                <div className={styles["guide-content"]}>
                    <h3 className={styles["guide-title"]}>
                        <Link className="unstyled" href={`/huong-dan/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <span className={styles["guide-tags-list"]}>{guideTagArr.map((guideTag, index) => <Tag key={index} tagType={"guide"} url={`/huong-dan?tag=${toSlug(guideTag)}`} tagName={guideTag} />)}</span>
                    <span className={styles["guide-time"]}>{post.time}</span>
                </div>
            </div>
        </div >
    );
};
export default GuideCard;