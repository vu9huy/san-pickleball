import { ArticleJsonLd } from "next-seo";

const ArticleSchemaComp = ({ blogData }) => {
    const { url, title, description, images, datePublished, dateModified } = blogData;
    return (
        <ArticleJsonLd
            useAppDir={true}
            type="BlogPosting"
            url={url}
            title={title}
            description={description}
            images={images}
            datePublished={datePublished}
            dateModified={dateModified}
            authorName="Quân Vũ"
        />
    );
};

export default ArticleSchemaComp;