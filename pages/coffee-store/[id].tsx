import {useContext, useEffect, useState} from "react";
import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";


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
                    <Image src={imgUrl} className={styles.storeImg} alt={name} width={600} height={360}/>
                </div>

                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24" />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvote} >Upvote</button>
                </div>
            </div>
        </div>
    );
};
export default CoffeeStore;

