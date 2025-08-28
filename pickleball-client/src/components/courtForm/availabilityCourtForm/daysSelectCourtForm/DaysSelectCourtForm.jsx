import MultiSelect from "@/components/multiSelect/MultiSelect";

const DaysSelectCourtForm = ({ days, defaultValue, selectHandler }) => {
    return (
        <div className="days-select-court-form-container">
            <MultiSelect
                options={days}
                defaultValue={defaultValue}
                placeholder={"Chọn ngày..."}
                noOptionsMessage={"Đã chọn hết các ngày trong tuần"}
                selectHandler={selectHandler} />
        </div>
    );
};

export default DaysSelectCourtForm;