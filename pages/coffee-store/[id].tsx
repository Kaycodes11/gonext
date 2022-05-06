import {useContext, useEffect, useState} from "react";
import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";
import {fetchCoffeeStores} from "../../lib/coffee-stores";


type  CoffeeStore = {
    "id": number,
    "geocodes": { main: object, roof: object },
    "link": string,
    "name": string,
    "imgUrl": string,
    related_places: object,
    "timezone": string,
    location: {
        address: string, country: string, cross_street: string, formatted_address: string, locality: any[], postcode: string, region: string,
        "neighborhood": string[]
    }
};

type Props = {
    coffeeStore: CoffeeStore;
};


export const getStaticProps: GetStaticProps = async (staticProps) => {
    const params: Record<string, string | number> | any = staticProps.params;
    // @ts-ignore
    const coffeeStores: Array<unknown> = await fetchCoffeeStores() || [];
    console.log('coffee::  ', coffeeStores);
    const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
        // @ts-ignore
        return coffeeStore.id.toString() === params.id; //dynamic id
    });
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        },
    };
}
export const getStaticPaths: GetStaticPaths = async () => {
    const coffeeStores = await fetchCoffeeStores() || [];
    // @ts-ignore
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id,
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

const CoffeeStore: NextPage<Props> = (props: Props) => {
    const router = useRouter();
    const id = router.query.id;
    console.group(`router`, id); // 51819802498ee3c6834b8e0b
    console.group("props", JSON.stringify(props, null, 4))
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore || {});
    // const {state: {coffeeStores}} = useContext(StoreContext);

    if (router.isFallback) {
        return <div>Loading....</div>;
    }

    // it has to be router.isFallback since if it does fallback the props = {} so these props"ll be undefined
    const {name, location, timezone, imgUrl} = props.coffeeStore;
    // console.log(`Neighbourhood:: `, location["neighborhood"][0]);


    const handleUpvote = () => {

    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href={"/"} scroll={false}>
                            <a>Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                        className={styles.storeImg} alt={name} width={600} height={360}/>
                </div>

                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24"/>
                        <p className={styles.text}>{location.formatted_address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24"/>
                        <p className={styles.text}>{location.neighborhood?.[0]}</p>

                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24"/>
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvote}>Upvote</button>
                </div>
            </div>
        </div>
    );
};
export default CoffeeStore;

