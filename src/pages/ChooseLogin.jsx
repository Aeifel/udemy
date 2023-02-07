import styles from "../styles/ChooseLogin.module.css"
import {Link} from "react-router-dom"
const ChooseLogin = () => {
    return (
        <>
        <div className={styles.bodyContainer}>
            <div className={styles.leftCol}>
                <div className={styles.instructorContents}>
                    <h2>For <span style={{color:'var(--textSecondary)'}}>Companies</span></h2>
                    <p>We are the market–leading technical interview platform to identify and hire developers with the right skills.</p>
                    <Link to="/instructor/login"><button className={styles.filledBtn}>Login</button></Link>
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.studentContents}>
                    <h2>For <span style={{color:'var(--blueDark)'}}>Students</span></h2>
                    <p>We are the market–leading technical interview platform to identify and hire developers with the right skills.</p>
                    <Link to="/student/login"><button className={styles.outlinedBtn}>Login</button></Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default ChooseLogin;