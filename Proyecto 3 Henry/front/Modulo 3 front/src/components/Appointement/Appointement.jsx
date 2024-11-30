import { useContext } from "react"
import styles from "./Appointement.module.css"
import { UsersContext } from "../../contexts/UsersContext"
import Swal from "sweetalert2"
import PropTypes from "prop-types";

const Appointement = ({id, time, description, date, status}) => {

    const { cancelAppointement } = useContext(UsersContext)

    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                cancelAppointement(id)
                    .then(() => {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your appointment has been successfully cancelled.",
                            icon: "info",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: false,
                            position: "center",
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            icon: "error",
                            title: `${error.response?.data || "Something went wrong"}`,
                        });
                    });
                }
            });
    };
    

    return(
        <div>
            <div className={styles.container}>
                <h3>#{id}</h3>

                <div className={styles.vertical}></div>

                <p><strong>Status: </strong>{status}</p>
                <p><strong>Date: </strong>{date}</p>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Time: </strong>{time}</p>

                <div className={styles.vertical}></div>

                <button
                    onClick={handleCancel}
                    disabled={status === "cancelled"}
                    >Cancell
                </button>
            </div>
        </div>
    )
}

Appointement.propTypes = {
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default Appointement;