import { useContext, useState } from "react";
import styles from "./Register.module.css";
import { validateLoginRegister } from "../../helpers/validate";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";

const Register = () => {

  const {registerUser} = useContext(UsersContext)

  const navigate = useNavigate();

  const [userRegisterData, setUserRegisterData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    name: "Name is required",
    email: "Email is required",
    birthdate: "Birthdate is required",
    nDni: "NDni is required",
    username: "Username is required",
    password: "Password is required"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserRegisterData({
      ...userRegisterData,
      [name]: value,
    });

    setErrors((prevErrors) => {
      const newErrors = validateLoginRegister({ ...userRegisterData, [name]: value });

      if(!value) newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`

      return {
        ...prevErrors,
        [name]: newErrors[name],
      };
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    registerUser(userRegisterData)
      .then(() => {
              Swal.fire({
                toast: false,
                position: "center",
                showConfirmButton: true,
                timer: 2000,
                timerProgressBar: true,
                icon: "info",
                title: `User Registered Successfully, Redirecting to Login!`,
              });
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        Swal.fire({
          toast: false,
          position: "center",
          showConfirmButton: true,
          timerProgressBar: false,
          icon: "warning",
          title: `Server Error: ${error.response.data}`,
        });
      });
  };

  // Obtener la fecha actual
const currentDate = new Date();

// Calcular la fecha límite para los 18 años
const minDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 18));

// Convertir la fecha al formato 'YYYY-MM-DD' para usarla en el atributo max
const maxDateString = minDate.toISOString().split("T")[0];

  return (
    <div className={styles.container}>
      <div className={styles.vertical}></div>

      <div className={styles.register}>
        <span>Register Here!</span>

        <div className={styles.horizontal}></div>

        <form onSubmit={handleOnSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name Here!"
              value={userRegisterData.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && (
            <span style={{ color: "red", fontSize: "1vw", fontWeight: "500" }}>
              {errors.name}
            </span>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email here! user@mail.com"
              value={userRegisterData.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && (
            <span style={{ color: "red", fontSize: "1vw", fontWeight: "500" }}>
              {errors.email}
            </span>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              placeholder="Birthdate here!"
              value={userRegisterData.birthdate}
              max={maxDateString}
              name="birthdate"
              onChange={handleInputChange}
            />
          </div>
          {errors.birthdate && (
            <span style={{ color: "red", fontSize: "1vw", fontWeight: "500" }}>
              {errors.birthdate}
            </span>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="dni">DNI number</label>
            <input
              type="number"
              id="dni"
              placeholder="DNI here! 42123123"
              value={userRegisterData.nDni}
              name="nDni"
              onChange={handleInputChange}
            />
          </div>
          {errors.nDni && (
            <span style={{ color: "red", fontSize: "1vw", fontWeight: "500" }}>
              {errors.nDni}
            </span>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username here!"
              value={userRegisterData.username}
              name="username"
              onChange={handleInputChange}
            />
          </div>
          {errors.username && (
            <span style={{ color: "red", fontSize: "1vw", fontWeight: "500" }}>
              {errors.username}
            </span>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password here!"
              value={userRegisterData.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && (
            <span style={{ color: "red", fontSize: "1vw", fontWeight: "500" }}>
              {errors.password}
            </span>
          )}

          <button
            disabled={
                !Object.keys(errors).length > 0 ||
                errors.password != undefined ||
                errors.password != null ||
                !userRegisterData.name ||
                !userRegisterData.email ||
                !userRegisterData.birthdate ||
                !userRegisterData.nDni ||
                !userRegisterData.username || 
                !userRegisterData.password    
            }
            type="submit"
            value="submitRegister"
          >
            Register!
          </button>
        </form>

        <Link to="/login" className={styles.Link}>¿You Have Already An Account?, <br />¡Login Here 👆!</Link>

      </div>
    </div>
  );
};

export default Register;
