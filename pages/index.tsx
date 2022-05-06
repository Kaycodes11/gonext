import type {GetStaticProps, NextPage} from 'next'
import {useCallback} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import card from "../components/card";
import Banner from "../components/banner";
import Image from "next/image";
import Card from "../components/card";

const getStaticProps: GetStaticProps = async (context) => {
    console.log(`Hi getStaticProps from starting component`);
    let coffeeStoreData: any[] = [];
    const response = await fetch(`https://api.foursquare.com/v2/venues/search?ll=43.65267326999575,-79.39545615725015&query=coffee stores&client_id=EZOA4G1YNDLOKTASDSUGWLNGFOFFIEDVQ3B3FCFUIROZI31P&client_secret=SU4LIOGZG1PEDSJ43I5DJ2V3RRHDH0VHO3VPX3XCJX1W0YLX&v=20220506`);
    const data = await response.json();
    return {
        props: {
            coffeeStores: data?.response.venues
        }
    }
};


const Home: NextPage = (props: Record<string, any>) => {
    console.log("props: ", props);
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
                {props.coffeeStores.length > 0 && (
                    <>
                        <h2 className={styles.heading2}>Toronto Stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore: Record<string, any>) => {
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
