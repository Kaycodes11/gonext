import type {NextPage} from 'next'
import {useCallback} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/banner";
import Image from "next/image";


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
                <Banner buttonText="View The Nearby Stores" handleOnClick={handleOnBannerClick}/>
                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" width={700} height={400}/>
                </div>
                <h2 className={styles.heading2}>Toronto Stores</h2>
            </main>
        </div>
    )
}

export default Home
