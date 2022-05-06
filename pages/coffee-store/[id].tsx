import { useContext, useEffect, useState } from "react";
import type {GetStaticProps, NextPage} from "next";
import {useRouter} from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";

export const getStaticProps: GetStaticProps = (staticProps) => {
    const params = staticProps.params;
    console.log(params);
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => {
                return coffeeStore.id.toString() === params?.id
            })
        }
    }
}

const CoffeeStore: NextPage = () => {
    const CoffeeStore = (props: {}) => {
        const router = useRouter();
        console.info(router);

    }
    const { address, name, neighbourhood } = props.CoffeeStore;

    console.log(props);
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
        </div>
    );
};
export default CoffeeStore;