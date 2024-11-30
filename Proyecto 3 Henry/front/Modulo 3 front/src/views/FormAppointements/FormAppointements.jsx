import Swal from "sweetalert2";
import styles from "./FormAppointements.module.css";
import { useContext, useState } from "react";
import { validateAppointement } from "../../helpers/validate";
import { UsersContext } from "../../contexts/UsersContext";

const AppointementsShifts = () => {

    const { user, createAppointement } = useContext(UsersContext)

    const [appointementRegisterData, setAppointementRegisterData] = useState({
        date:"",
        time:"",
        userId: user,
        description: ""
    })

    const [errors, setErrors] = useState({
        date: "Date is required",
        time: "Time is required",
        description: "Description is required"
    })
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setAppointementRegisterData({
            ...appointementRegisterData,
            [name]: value,
        });
    
        setErrors((prevErrors) => {
            const newErrors = validateAppointement({ ...appointementRegisterData, [name]: value });
    
            if (!value) newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    
            return {
                ...prevErrors,
                [name]: newErrors[name],
            };
        });
    };  

    const handleOnSubmit = (event) => {
        event.preventDefault()
        createAppointement(appointementRegisterData)
        .then(() => {
            Swal.fire({
                toast: false,
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                icon: "info",
                title: `Appointement scheduled successfully!`,
              });
        })
        .catch((error) => {
            Swal.fire({
                toast: false,
                position: "center",
                showConfirmButton: true,
                icon: "warning",
                title: `Server Error: ${error.response.data}`,
            });
        })
        .finally(() => {
            setAppointementRegisterData({
                date:"",
                time:"",
                userId: user,
                description: ""
            }) 
        })
    }

    const currentDate = new Date().toISOString().split("T")[0];
    
    return (
        <div className={styles.container}>
            <span className={styles.title}>Create a new appointement here! 👇</span>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="date">Date: </label>
                    <input 
                        className={styles.input} 
                        type="date" 
                        id="date" 
                        name="date"
                        value={appointementRegisterData.date}
                        onChange={handleInputChange}
                        min={currentDate}/>
                </div>
                {errors.date && (
                    <span style={{ marginTop: "-1.7vw", color: "red", fontSize: "1vw", fontWeight: "500" }}>
                    {errors.date}
                    </span>
                )}

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="time">Time: </label>
                    <input 
                        className={styles.input} 
                        type="time" 
                        id="time" 
                        name="time"
                        value={appointementRegisterData.time}
                        onChange={handleInputChange}/>
                </div>
                {errors.time && (
                    <span style={{ marginTop: "-1.7vw", color: "red", fontSize: "1vw", fontWeight: "500" }}>
                    {errors.time}
                    </span>
                )}

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="description">Description: </label>
                    <input 
                        className={styles.input} 
                        type="text" 
                        id="description" 
                        name="description"
                        value={appointementRegisterData.description}
                        onChange={handleInputChange}/>
                </div>
                {errors.description && (
                    <span style={{ marginTop: "-1.7vw", color: "red", fontSize: "1vw", fontWeight: "500" }}>
                    {errors.description}
                    </span>
                )}

                <button 
                    className={styles.button} 
                    type="submit" 
                    disabled={
                        errors.date != null ||
                        errors.date != undefined ||
                        errors.description != null ||
                        errors.description != undefined ||
                        errors.time != null ||
                        errors.time != undefined ||
                        !appointementRegisterData.time ||
                        !appointementRegisterData.description ||
                        !appointementRegisterData.date
                    }>
                        Add New Appointement! 👆
                </button>
            </form>
        </div>
    );
};

export default AppointementsShifts;