import Image from "next/image";
import style from "./page.module.css";

const GetLocationGuide = () => {


    return (
        <div className="">
            <h1 className={style["title"]} style={{ textAlign: "center" }}>Hướng dẫn lấy kinh độ vĩ độ trên goolge map</h1>
            <ul>
                <li className={style["step"]}>- <b>Bước 1</b>: Truy cập <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps">google map</a>.</li>
                <li className={style["step"]}>- <b>Bước 2</b>: Xác định vị trí chính xác sân Pickleball của bạn.</li>
                <li className={style["step"]}>- <b>Bước 3</b>: Click chuột phải vào vị trí sân, sẽ thấy hiện lên vị trí tọa độ ở dòng đầu.</li>
            </ul>
            <figure className="image">
                {/* <img
                    src="https://res.cloudinary.com/du2azaqnn/image/upload/v1722351107/Screen_Shot_2024-07-29_at_14.58.13_nweg7w_zea4jf.png"
                    width={559}
                    height={567}
                    alt="Lấy kinh độ vĩ độ trên google map" /> */}
                <Image
                    src="https://res.cloudinary.com/du2azaqnn/image/upload/v1722351107/Screen_Shot_2024-07-29_at_14.58.13_nweg7w_zea4jf.png"
                    width={559}
                    height={567}
                    alt="Lấy kinh độ vĩ độ trên google map" />
            </figure>
            <ul>
                <li className={style["step"]}>
                    <p>- <b>Bước 4</b>: Click chuột trái vào dòng vị trí tọa độ để copy. Như vậy bạn đã lấy được kinh độ và vĩ độ của sân (số đằng trước là vĩ độ, đằng sau là kinh độ).</p>
                    <p>&nbsp;</p>
                </li>
                <p style={{ textAlign: "right" }}>-Sân Pickleball-</p>
            </ul>
        </div>
    );
};

export default GetLocationGuide;