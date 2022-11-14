import React, { useEffect } from "react";
import "../styles/reset.css";
import "../styles/global.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
