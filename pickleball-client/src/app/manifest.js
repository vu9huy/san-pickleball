export default function manifest() {
    return {
        name: "Sân Pickleball",
        short_name: "Sân Pickleball",
        description: "Sân Pickleball - Tìm kiếm và đặt sân pickleball trên toàn quốc",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
            {
                src: "/icon.ico",
                sizes: "16x16",
                type: "image/x-icon"
            }
        ]
    };
}