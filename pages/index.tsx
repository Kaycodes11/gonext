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
        props: {coffeeStores: coffeeStores ?? []}
    }
};

const Home: NextPage = (props: any) => {
    console.log(`PROPS:: `, props);

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
                {props?.coffeeStores?.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Stores near me</h2>
                        <div className={styles.cardLayout}>
                            {props?.coffeeStores?.map((coffeeStore: Record<string, any>) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
                {props?.coffeeStores?.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Toronto stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore: Record<string, any>) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={
                                            coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Home
