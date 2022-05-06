import type {GetStaticProps, NextPage} from 'next'
import {useCallback} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import card from "../components/card";
import Banner from "../components/banner";
import Image from "next/image";
import Card from "../components/card";
import {fetchCoffeeStores} from "../lib/coffee-stores";

const getStaticProps: GetStaticProps = async (context) => {
    const coffeeStores = await fetchCoffeeStores();
    return {
        props: {coffeeStores}
    }
};

const Home: NextPage = ({coffeeStores = []}: Record<string, any>) => {
    console.log(`coffeeStores`, coffeeStores);

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
                {coffeeStores.length > 0 && (
                    <>
                        <h2 className={styles.heading2}>Toronto Stores</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore: Record<string, any>) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}

export default Home
