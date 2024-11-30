import { useContext, useState } from 'react';
import styles from './Login.module.css'; 
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { validateLoginRegister } from '../../helpers/validate';
import { UsersContext } from '../../contexts/UsersContext';

const Login = () => {
    
    const {loginUser} = useContext(UsersContext)

    const [userLoginData, setUserLoginData] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({
      username: "Username is required",
      password: "Password is required"
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setUserLoginData({
          ...userLoginData,
          [name]: value,
        });
    
        setErrors((prevErrors) => {
          const newErrors = validateLoginRegister({ ...userLoginData, [name]: value });
    
          if(!value) newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    
          return {
            ...prevErrors,
            [name]: newErrors[name],
          };
        });
      };
      

      const handleOnSubmit = (event) => {
        event.preventDefault();
        loginUser(userLoginData)
          .then(() => {
              Swal.fire({
                toast: false,
                position: "center",
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                icon: "info",
                title: `User Logged Successfully!`,
              });
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

    return (
        <div className={styles.container}>

            <div className={styles.login}>
                
                <span>Login Here!</span>
                
                <div className={styles.horizontal}></div>
                
                <form onSubmit={handleOnSubmit}>

                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text"
                            id="username"
                            placeholder="Username here!"
                            value={userLoginData.username}
                            name="username"
                            onChange={handleInputChange} />
                    </div>
                    {errors.username && (
                        <span style={{ marginTop: "-1.7vw", color: "red", fontSize: "1vw", fontWeight: "500" }}>
                        {errors.username}
                        </span>
                    )}


                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            placeholder="Password here!"
                            value={userLoginData.password}
                            name="password"
                            onChange={handleInputChange} />
                    </div>  
                        {errors.password && (
                            <span style={{ marginTop: "-1.7vw", color: "red", fontSize: "1vw", fontWeight: "500" }}>
                            {errors.password}
                            </span>
                        )}

                    <button type="submit" value="submitLogin" 
                        disabled={
                            !Object.keys(errors).length > 0 ||
                            errors.username != undefined ||
                            errors.username != null ||
                            errors.password != undefined ||
                            errors.password != null ||
                            !userLoginData.username ||
                            !userLoginData.password
                        }>Login!</button>

                    <Link className={styles.Link} to="/register">
                        ¿Don´t have account? ¡Register Here 👆!
                    </Link>
                
                </form>

            </div>

        </div>
    );
};

export default Login;