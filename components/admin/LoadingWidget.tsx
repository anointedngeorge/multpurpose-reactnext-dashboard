import { useState, useEffect } from "react";
import Router from "next/router";

const LoadingWidget = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return loading ? 
          <div className="flex place-content-center items-center">
              <div>
                  <span className="loading loading-ring loading-xs"></span>
                  <span className="loading loading-ring loading-sm"></span>
                  <span className="loading loading-ring loading-md"></span>
                  <span className="loading loading-ring loading-lg"></span>
              </div>
          </div> 
      : null;
};

export default LoadingWidget;