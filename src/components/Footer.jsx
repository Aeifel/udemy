import styles from "../styles/Footer.module.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CopyrightIcon from '@mui/icons-material/Copyright';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.firstRow}>
                <div>
                    <h2>Contact Us</h2>
                    <p className={styles.container}>
                    <LocalPhoneIcon
                    sx={{fontSize:"2rem", display:"inline-block"}}
                    />+91 638539778</p>
                    <p className={styles.container}>
                    <MailIcon
                    sx={{fontSize:"2rem", display:"inline-block"}}
                    />ulearn@uedu.com</p>
                </div>
                <div className={styles.secondCol}>
                    <h2>Find us on</h2>
                    <div className="iconContainer">
                        <GitHubIcon
                        sx={{fontSize:"2rem" , marginInline:"10px"}}
                        />
                        <TwitterIcon
                        sx={{fontSize:"2rem" , marginInline:"10px"}}
                        />
                        <FacebookIcon
                        sx={{fontSize:"2rem" , marginInline:"10px"}}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.secondRow}>
                <p><CopyrightIcon/>Made with <FavoriteIcon/> by Ashwin and Kathir</p>
            </div>
        </div>
    )
}
export default Footer;