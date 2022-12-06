import { useRouter } from "next/router";
import { useEffect } from "react";

const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeComplete = (url) => {
      window.goatcounte?.count({
        path: url,
        title: document.title,
      });
    };

    if (router) {
      router.events.on("routeChangeComplete", onRouteChangeComplete);
    }

    return () =>
      router.events.off("routeChangeComplete", onRouteChangeComplete);
  }, [router]);
};

export default useAnalytics;
