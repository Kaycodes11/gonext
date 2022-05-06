import type {NextPage} from "next";
import {useRouter} from "next/router";
import Link from "next/link";

const CoffeeStore: NextPage = () => {
    const router = useRouter();
    console.info(router);
    return (
        <div>
            Coffee Store and id is {router.query.id}
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