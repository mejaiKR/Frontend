import Script from "next/script";
import React from "react";

const GoogleAd = () => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2095945219977195"
      crossOrigin="anonymous"
      strategy={"afterInteractive"}
    ></Script>
  );
};

export default GoogleAd;
