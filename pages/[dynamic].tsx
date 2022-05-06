import {NextPage} from "next";
import Head from "next/head";
import {useRouter} from "next/router";

const Dynamic: NextPage = () => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{router.query.dynamic}</title>
            </Head>
            Hi, there I am Dynamic route: { router.query.dynamic }
        </div>
    )
};

export default Dynamic;