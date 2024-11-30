import { useContext, useEffect } from "react"
import Appointement from "../../components/Appointement/Appointement"
import styles from "./AppointementsView.module.css"
import calendar from "../../assets/calendar.png"
import { UsersContext } from "../../contexts/UsersContext"

const AppointementsView = () => {
  const { user ,userAppointements, getUserAppointements} = useContext(UsersContext)

  useEffect(() => {
    if (user) getUserAppointements(user); 
  }, [user, getUserAppointements]);


  return (
    <div className={styles.container}>
        <div>
            <span>My appointements</span>
        </div>

        <div>
          {userAppointements.length > 0 ? (
              userAppointements.map((app) => (
                <Appointement
                    key={app.id} 
                    id={app.id}
                    date={app.date}
                    description={app.description}
                    status={app.status}
                    time={app.time}
                />
                ))
              ) : (
                <div>
                  <span>No scheduled appointements! 🚫</span>
                  <br />
                  <br />
                  <img src={calendar} alt="No appointments" />
                </div>
          )}
        </div>
    </div>
  )
}

export default AppointementsView;