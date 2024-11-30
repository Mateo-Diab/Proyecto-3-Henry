import { useContext } from 'react';
import styles from './NavBar.module.css'; 
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from '../../contexts/UsersContext';
import Swal from 'sweetalert2';

const NavBar = () => {
  
  const { logOutUser } = useContext(UsersContext)
  
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOutUser()
    Swal.fire({
      toast: false,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      icon: "info",
      title: `User successfully logged out!`,
    });
    navigate("/login")
  }

  return (
    <div className={styles.container}>
        <Link to="/home" className={styles.navelement}><span>HOME</span></Link>
        <Link to="/appointements" className={styles.navelement}><span>APPOINTEMENTS</span></Link>  
        <Link to="/contact" className={styles.navelement}><span>CONTACT</span></Link>
        <Link to="/about" className={styles.navelement}><span>ABOUT</span></Link>
        <Link to="/newappointement" className={styles.navelement}><span>NEW APPOINTEMENT</span></Link>

        <div className={styles.vertical}></div>
        
        <span className={`${styles.logout} ${styles.navelement}`} onClick={handleLogOut}>•LOGOUT!👋</span>
    </div>
  );
}

export default NavBar;
