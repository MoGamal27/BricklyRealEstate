import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // لو عايزاه instant خليه "auto"
        });
    }, [pathname]);
    return null;
};
export default ScrollToTop;
