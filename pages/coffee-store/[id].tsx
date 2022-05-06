import {useContext, useEffect, useState} from "react";
import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import {Property} from "csstype";


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
    console.group( "props", props)

    if (router.isFallback) {
        return <div>Loading....</div>;
    }

    const { name, address, neighbourhood  } = props.coffeeStore;

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <Link href={"/"} scroll={false}>
                <a>Back to home</a>
            </Link>
            <Link href={"/coffee-store/dynamic"} scroll={false}>
                <a>Go to page dynamic</a>
            </Link>
            <h2>{address}</h2>
        </div>
    );
};
export default CoffeeStore;