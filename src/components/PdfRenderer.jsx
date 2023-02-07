import{ useState,useMemo } from 'react';
import Iframe from 'react-iframe'
import styles from "../styles/PdfRenderer.module.css"
const PdfRenderer = (props) => {
  const {PdfUrl} = props;
  return (
    <div className={styles.frame}>
 <Iframe url={PdfUrl}
        id={PdfUrl}
        className={styles.frame}
        />
    </div>
  );
}
export default PdfRenderer;