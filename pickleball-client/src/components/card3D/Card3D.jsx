import Image from "next/image";
import styles from "./Card3D.module.css";

const Card3D = () => {

    const cardList = [
        { image: "/images/testcard/dragon_1.webp" },
        { image: "/images/testcard/dragon_2.jpeg" },
        { image: "/images/testcard/dragon_3.webp" },
        { image: "/images/testcard/dragon_4.webp" },
        { image: "/images/testcard/dragon_5.webp" },
        { image: "/images/testcard/dragon_6.jpg" },
        { image: "/images/testcard/dragon_7.webp" },
        { image: "/images/testcard/dragon_8.webp" },
        { image: "/images/testcard/dragon_9.webp" },
        { image: "/images/testcard/dragon_10.webp" }
    ];

    return (
        <div className={styles["banner"]}>
            <div className={styles["slider"]} style={{ "--quantity": `${cardList.length}` }}>
                {cardList.map((card, index) => {
                    return (
                        <div className={styles["item"]} key={index} style={{ "--position": index }}>
                            <div className={styles["card"]}>
                                <div className={styles["card-image"]}>
                                    {/* <img src={card.image} alt="" /> */}
                                    <Image src={card.image} fill alt="test" />
                                </div>
                                <p>Dragon {index + 1}</p>
                            </div>
                            {/* <img src={card.image} alt="" /> */}
                        </div>
                    );
                })}
            </div >
            {/* <div className={styles["content"]}>
                <h1 data-content="CSS ONLY">
                    CSS ONLY
                </h1>
                <div className={styles["author"]}>
                    <h2>LUN DEV</h2>
                    <p><b>Web Design</b></p>
                    <p>
                        Subscribe to the channel to watch many interesting videos
                    </p>
                </div>
                <div className={styles["model"]}></div>
            </div> */}
        </div >
    );
};
export default Card3D;