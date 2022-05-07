import type {GetStaticProps, NextPage} from 'next'
import {useCallback, useEffect, useState} from "react";
import Head from 'next/head'
import Card from "../components/card";
import Banner from "../components/banner";
import Image from "next/image";
import styles from '../styles/Home.module.css'
import {fetchCoffeeStores} from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";


const getStaticProps: GetStaticProps = async (context) => {
    const coffeeStores = await fetchCoffeeStores();
    return {
        props: {coffeeStores: coffeeStores ?? []}
    }
};

const Home: NextPage = (props: any) => {
    console.log(`PROPS:: `, props);
    const { handleTrackLocation, locationErrorMsg, latLong } = useTrackLocation();
    const [coffeeStoresError, setCoffeeStoresError] = useState(null);
    // const { dispatch, state } = useContext(StoreContext);
    // const { coffeeStores, latLong } = state;

    // useEffect(() => {}, [])

    const handleOnBannerClick = useCallback(() => {
        handleTrackLocation();
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Finder</title>
                <meta name="description" content="Find coffee stores nearby"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="allows you to discover coffee stores"
                ></meta>
            </Head>

            <main className={styles.main}>
                <Banner buttonText="View The Nearby Stores" handleOnClick={handleOnBannerClick}/>
                {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
                {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}

                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" width={700} height={400} alt={"hero image"}/>
                </div>
                {/*<h2 className={styles.heading2}>Toronto Stores</h2>*/}
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
