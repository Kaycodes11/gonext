import type { NextPage } from "next";
import styles from "./banner.module.css";

type Props = {
    buttonText: string;
    handleOnClick: () => void;

}

// These React Component [called page by Next) must use default export
const Banner: NextPage<Props> = ({buttonText, handleOnClick}: Props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Coffee</span>
                <span className={styles.title2}>Finder</span></h1>
            <p className={styles.subTitle}>Discover local coffee shops!</p>
            <div className={styles.buttonWrapper}>
            <button className={styles.button} type="button" onClick={handleOnClick}>{buttonText}</button>
            </div>
        </div>
    )
}

export default Banner;