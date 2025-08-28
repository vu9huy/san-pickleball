import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import styles from "./CourtTable.module.css";
import Link from "next/link";
import { useCreateCourtFetchingApi, useEditCourtByIdFetchingApi, useGetCourtByListIdFetchingApi, useGetCourtByOwnerIdFetchingApi } from "@/api/serverApi/callApi";
import TableCourtManageAction from "./tableCourtManageAction/TableCourtManageAction";
import TableCourtDescription from "./tableCourtDescription/TableCourtDescrition";
import TableTitle from "./tableTitle/TableTitle";
import ModalTotal from "../modalTotal/ModalTotal";
import CourtForm from "../courtForm/CourtForm";
import { ModalDialog2 } from "../modalTotal/ModalTotal2";
import { useForm } from "react-hook-form";
import { convertImageToBase64 } from "@/utils/others/convertBase64";
import { getUserIdFromCookie } from "@/utils/userdata/userdataUtilities";
import stringToSlugWithRandomString from "@/utils/others/toSlugWithString";
import Pagination from "../pagination/Pagination";
import { useSearchParams } from "next/navigation";

// EXAMPLE
// const courts = [
//     { id: 1, name: "Conan the Barbarian", description: "1982" },
//     { id: 2, name: "Inception", description: "2010" },
//     { id: 3, name: "Interstellar", description: "2014" },
//     { id: 4, name: "The Dark Knight", description: "2008" },
//     { id: 5, name: "The Matrix", description: "1999" }
// ];

// createTheme("solarized", {
//     text: {
//         primary: "#268bd2",
//         secondary: "#2aa198"
//     },
//     background: {
//         default: "#002b36"
//     },
//     context: {
//         background: "#cb4b16",
//         text: "#FFFFFF"
//     },
//     divider: {
//         default: "#073642"
//     },
//     action: {
//         button: "rgba(0,0,0,.54)",
//         hover: "rgba(0,0,0,.08)",
//         disabled: "rgba(0,0,0,.12)"
//     }
// }, "dark");

// createTheme("customTheme", {
//     text: {
//         primary: "#268bd2",
//         secondary: "#2aa198"
//     },
//     background: {
//         default: "#f5f5f5"
//     },
//     context: {
//         background: "#cb4b16",
//         text: "#FFFFFF"
//     },
//     divider: {
//         default: "#073642"
//     },
//     button: {
//         default: "#2aa198",
//         hover: "rgba(0,0,0,.08)",
//         focus: "rgba(255,255,255,.12)",
//         disabled: "rgba(0,0,0,.12)"
//     },
//     sortFocus: {
//         default: "#2aa198"
//     }
// });

// Define columns
// const columns = [
//     {
//         name: <h3>Stt</h3>,
//         selector: (row, index) => <span>{index + 1}</span>,
//         // sortable: true,
//         width: "60px"
//     },
//     {
//         name: <h3>Tên</h3>,
//         selector: row => <Link className="link" href={`/tim-san/${row.id}`}>{row.name}</Link>,
//         sortable: true
//     },
//     {
//         name: <h3>Mô Tả</h3>,
//         selector: row => <TableCourtDescription description={row.description} />,
//         // sortable: true
//         // maxWidth: "400px"
//     },
//     {
//         name: <h3>Hành động</h3>,
//         selector: row => <TableCourtManageAction courtId={row.id} />
//         // sortable: true
//     }
// ];

const courtDefault = {
    "name": "",
    "description": "",
    "location": {
        "address": "",
        "province": "",
        "district": ""
    },
    "geolocation": {
        "latitude": null,
        "longitude": null
    },
    "numberOfCourts": null,
    "feature": {
        "indoor": false,
        "canopy": false,
        "equipmentRentals": false,
        "freeTrainer": false
    },
    "utilities": [],
    "availability": [
        {
            "label": "",
            "openTime": {
                "hours": 8,
                "minutes": 0
            },
            "closeTime": {
                "hours": 23,
                "minutes": 0
            }
        }
    ],
    "bookingInfo": {
        "priceRange": {},
        "detail": []
    },
    "images": []
};

const CourtTable = ({ user, refetchGetUser }) => {
    // const courts = user?.courts || [];
    // const { data: response, isPending, isError, refetch: refetchGetCourtByListId } = useGetCourtByListIdFetchingApi(courts);
    const userId = user?.id;
    const params = useSearchParams();
    const page = params.get("page") || 1;

    const { data: response, isPending, isError, refetch: refetchGetCourtByListId } = useGetCourtByOwnerIdFetchingApi(userId, page);
    const courts = response?.data?.results || [];

    // if (isError) return "Error"
    // if (isPending) return "Loading..."
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);

    const {
        register,
        formState,
        handleSubmit,
        setValue,
        control,
        watch,
        reset
    } = useForm({
        criteriaMode: "all",
        defaultValues: selectedCourt ? selectedCourt : courtDefault
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        reset(selectedCourt);
        setImages(watch("images"));
    }, [selectedCourt, reset]);

    const { mutateAsync: createCourtMutateAsync, isPending: createCourtLoading } = useCreateCourtFetchingApi();
    const { mutateAsync: editCourtMutateAsync, isPending: editCourtLoading } = useEditCourtByIdFetchingApi();

    const loading = createCourtLoading || editCourtLoading;

    const toggleCreateModal = () => {
        // Reset value when closed
        if (createModal) {
            setSelectedCourt(courtDefault);
            // Reset form data
            reset(courtDefault);
        }
        setCreateModal(!createModal);
    };

    const toggleDeleteModal = () => {
        // Reset value when closed
        if (deleteModal) {
            setSelectedCourt(courtDefault);
            // Reset form data
            reset(courtDefault);
        }
        setDeleteModal(!deleteModal);
    };

    const onSubmit = async (data) => {

        const base64s = await convertImageToBase64(images, watch("name"));
        data.images = base64s;

        const userId = getUserIdFromCookie();
        data.ownerId = userId;

        if (!data?.slug) {
            data.slug = stringToSlugWithRandomString(watch("name"));
        }
        // console.log("data5454", data);

        // return;
        const response = selectedCourt ? await editCourtMutateAsync({ courtId: data.id, courtData: data }) : await createCourtMutateAsync({ courtData: data });
        // Refetch user data and court data to update new court
        refetchGetUser();
        refetchGetCourtByListId();
        // Close modal
        toggleCreateModal();
    };

    const columns = [
        {
            name: <h3 className={styles["courts-table-title"]}>Stt</h3>,
            selector: (row, index) => <span>{index + 1}</span>,
            // sortable: true,
            width: "60px"
        },
        {
            name: <h3 className={styles["courts-table-title"]}>Tên</h3>,
            selector: row => <Link className="link" href={`/tim-san/${row.slug}`}>{row.name}</Link>,
            sortable: true,
            // maxWidth: "400px"
        },
        // {
        //     name: <h3 className={styles["courts-table-title"]}>Mô Tả</h3>,
        //     selector: row => <TableCourtDescription description={row.description} />
        //     // sortable: true
        //     // maxWidth: "400px"
        // },
        {
            name: <h3 className={`${styles["courts-table-title"]} ${styles["courts-table-action-title"]}`}>Hành động</h3>,
            selector: row => <TableCourtManageAction courtId={row.id} courstData={courts} toggleCreateModal={toggleCreateModal} setSelectedCourt={setSelectedCourt} />,
            width: "200px"
            // sortable: true
        }
    ];

    return (
        <>
            <DataTable
                title={<TableTitle toggleCreateModal={toggleCreateModal} title={"Danh sách sân"} user={user} />}
                columns={columns}
                data={courts}
                noDataComponent={isPending ? "Đang tải..." : "Không tìm thấy sân nào thuộc sở hữu của bạn"}
                // pagination
                // selectableRows
                // highlightOnHover
                theme="default"
            />
            <div>
                <ModalTotal
                    title={selectedCourt ? "Sửa sân" : "Thêm sân"}
                    loading={loading}
                    show={createModal}
                    primaryAction={handleSubmit(onSubmit)}
                    onClose={toggleCreateModal}
                >
                    <div>
                        <CourtForm
                            register={register}
                            formState={formState}
                            setValue={setValue}
                            control={control}
                            watch={watch}
                            images={images}
                            setImages={setImages}
                        />
                    </div>
                </ModalTotal>
                <ModalTotal title={"Xóa sân"} show={deleteModal} onClose={toggleDeleteModal}>
                    <div>
                        Bạn đã chắc chắn muốn xóa sân {selectedCourt?.name}?
                    </div>
                </ModalTotal>
                <Pagination totalPages={response?.data?.totalPages} />
            </div>
        </>

    );
};

export default CourtTable;
