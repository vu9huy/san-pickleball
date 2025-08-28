import getAddressFromSearchParam from "@/utils/others/getAddressFromSearchParam";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useSelectAddress = () => {
    const searchParams = useSearchParams();
    const { province: provinceObj, district: districtObj } = getAddressFromSearchParam(searchParams);

    const [province, setProvince] = useState(provinceObj);
    const [district, setDistrict] = useState(districtObj);

    return ({
        province,
        setProvince,
        district,
        setDistrict
    });
};
export default useSelectAddress;