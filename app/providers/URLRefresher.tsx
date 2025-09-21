"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const URLRefresher = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const auth = searchParams.get("auth");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/product" && id && !auth) {
            router.replace(`${pathname}?id=${id}`);
        }  else if (pathname === "/product" && auth) {
            router.replace(`${pathname}?id=${id}`);
        }  else if (id && pathname !== "/product") {
            router.replace('/');
        }
    }, [auth, id, pathname, router]);

    return children;
};

export default URLRefresher;