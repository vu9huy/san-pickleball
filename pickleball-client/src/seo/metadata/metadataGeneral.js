import { globalConfig } from "@/config/globalConfig";
import siteMetadata from "@/data/metadata/siteMetadata.json";


const metadataGeneralList = {
    "/": {
        title: "Sân Pickleball",
        description: "Sân Pickleball - Tìm kiếm và đặt sân pickleball trên toàn quốc",
        path: "/",
        images: [
            {
                url: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/sanpickleball-banner.png?v=1744221206",
                width: 1200,
                height: 630,
                alt: "sân pickleball"
            }
        ]
    },
    "tim-san": {
        title: "Tìm sân Pickleball",
        description: "Tìm sân Pickleball theo các tỉnh/thành trên Việt Nam",
        path: "/tim-san",
        images: [
            {
                url: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/sanpickleball-banner.png?v=1744221206",
                width: 1200,
                height: 630,
                alt: "Tìm sân Pickleball"
            }
        ]
    },
    "huong-dan": {
        title: "Hướng dẫn chơi Pickleball",
        description: "Hướng dẫn luật chơi và phương pháp luyện tập pickleball cho người mới",
        path: "/huong-dan",
        images: [
            {
                url: "https://res.cloudinary.com/du2azaqnn/image/upload/v1730795496/IMG_1363-scaled_ohb1je.webp",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn chơi Pickleball"
            }
        ]
    },
    "blog": {
        title: "Các bài viết hay nhất về Pickleball",
        description: "Các bài viết hay nhất về Pickleball",
        path: "/blogs",
        images: [
            {
                url: "https://res.cloudinary.com/du2azaqnn/image/upload/v1730185704/8d7be6a8c2862a3ad69be769caece1820f755bb0-2000x1223_uyfdck.webp",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn chơi Pickleball"
            }
        ]
    },
    "tinh-thanh": {
        title: "Tổng hợp danh sách sân pickleball theo tỉnh/thành",
        description: "Tổng hợp danh sách sân pickleball đang hoạt động trên tất cả các tỉnh/thành ở Việt Nam",
        path: "/tinh-thanh",
        images: [
            {
                url: "https://cdn.shopify.com/s/files/1/0697/0110/8031/files/sanpickleball-banner.png?v=1732246940",
                width: 1200,
                height: 630,
                alt: "Tổng hợp danh sách sân pickleball theo tỉnh/thành"
            }
        ]
    },
    "tim-nguoi-choi": {
        title: "Tìm đồng đội chơi pickleball",
        description: "Tìm đồng đội chơi pickleball ở gần bạn",
        path: "/tim-nguoi-choi",
        images: [
            {
                url: "https://cdn.shopify.com/s/files/1/0695/2104/7861/files/Screen_Shot_2025-09-20_at_22.09.23.png?v=1758381041",
                width: 1200,
                height: 630,
                alt: "Tìm đồng đội"
            }
        ]
    },
};

export const getMetadataFromPath = (path) => {
    if (!path) return null;
    const metadataObj = metadataGeneralList[path] || null;
    return metadataObj;
};


export const getMetadataGeneral = (path) => {
    const metadataObj = getMetadataFromPath(path);
    const metadata = {
        title: metadataObj?.title || siteMetadata.title,
        description: metadataObj?.description || siteMetadata.description,
        openGraph: {
            type: "website",
            title: metadataObj?.title || siteMetadata.title,
            description: metadataObj?.description || siteMetadata.description,
            url: `https://${globalConfig.domain}${metadataObj?.path}`,
            locale: siteMetadata.locale,
            siteName: siteMetadata.siteName,
            images: metadataObj?.images || siteMetadata.images
        },
        twitter: {
            card: "summary_large_image",
            title: metadataObj?.title || siteMetadata.title,
            description: metadataObj?.description || siteMetadata.description,
            creator: siteMetadata.creator,
            site: siteMetadata.site,
            images: metadataObj?.images || siteMetadata.images
        }
    };
    return metadata;
};


/**
 * @typedef {Object} Image
 * @property {string} url
 * @property {string} alt
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} metadataObj
 * @property {string} title
 * @property {string} description
 * @property {Image[]} images
 * @property {string} path
 */

export const getMetadataSpecific = (metadataObj) => {
    const { title, description, images, path } = metadataObj;
    const metadata = {
        title: title || siteMetadata.title,
        description: description || siteMetadata.description,
        openGraph: {
            type: "website",
            title: title || siteMetadata.title,
            description: description || siteMetadata.description,
            url: `https://${globalConfig.domain}${path}`,
            locale: siteMetadata.locale,
            siteName: siteMetadata.siteName,
            images: images || siteMetadata.images
        },
        twitter: {
            card: "summary_large_image",
            title: title || siteMetadata.title,
            description: description || siteMetadata.description,
            creator: siteMetadata.creator,
            site: siteMetadata.site,
            images: images || siteMetadata.images
        }
    };
    return metadata;
};