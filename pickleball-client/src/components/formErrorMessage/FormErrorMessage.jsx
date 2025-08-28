import styles from "./FormErrorMessage.module.css";
import { ErrorMessage } from "@hookform/error-message";

const FormErrorMessage = ({ errors, name }) => {

    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={({ messages }) => {
                console.log("messagesfggf", messages);
                return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p className={styles["form-error-messsage"]} key={type}>*{message}</p>
                    ))
                    : null;
            }}
        />
    );
};
export default FormErrorMessage;
