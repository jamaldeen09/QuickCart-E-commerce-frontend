import { useEffect, useState } from "react"


export const useResizer = (screenSize: number) => {
    const [isScreen, setIsScreen] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= screenSize) {
                setIsScreen(true);
            } else {
                setIsScreen(false);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return [isScreen] as const;
}