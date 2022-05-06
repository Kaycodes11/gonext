import {useContext, useEffect, useState} from "react";
import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";


type  CoffeeStore = {
    "id": number,
    "name": string,
    "imgUrl": string,
    "websiteUrl": string,
    "address": string,
    "neighbourhood": string
};

type Props = {
    coffeeStore: CoffeeStore;
};


export const getStaticProps: GetStaticProps = (staticProps) => {
    const params = staticProps.params;
    console.log(`params_here: `, params);
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => {
                return coffeeStore.id.toString() === params?.id
            })
        }
    }
}
export const getStaticPaths: GetStaticPaths = () => {
    const paths = coffeeStoresData.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
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
    console.group(`router`, router);
    console.group("props", props)

    if (router.isFallback) {
        return <div>Loading....</div>;
    }

    // it has to be router.isFallback since if it does fallback the props = {} so these props"ll be undefined
    const {name, address, neighbourhood, imgUrl, websiteUrl} = props.coffeeStore;


    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.col1}>
                <Link href={"/"} scroll={false}>
                    <a>Back to home</a>
                </Link>
                <p>{name}</p>
                <Image src={imgUrl} className={styles.storeImg} alt={name} width={600} height={360} />
            </div>
            <div className={styles.col2}>
                <p>{address}</p>
                <p>{neighbourhood}</p>
            </div>
        </div>
    );
};
export default CoffeeStore;