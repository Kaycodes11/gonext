import type {NextPage} from 'next'
import {useCallback} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/banner";

const Home: NextPage = () => {
    const handleOnBannerClick = useCallback(() => {
        console.log(`banner clicked`);
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Finder</title>
                <meta name="description" content="Find coffee stores nearby"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Banner buttonText="View The Nearby Stores" handleOnClick={handleOnBannerClick} />
            </main>
        </div>
    )
}

export default Home
