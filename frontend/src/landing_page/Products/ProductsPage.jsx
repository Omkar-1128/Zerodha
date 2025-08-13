import React from "react";
import Hero from "./Hero.jsx";
import Leftsection from "./Leftsection.jsx";
import Rightsection from "./Rightsection.jsx";
import Universe from "./Universe.jsx";

function ProductPage() {
  return (
    <div>
      <Hero />
      <Leftsection
        image={"/Media/images/kite.png"}
        tryDemo={"#"}
        learnMore={"#"}
        playStore={
          "https://play.google.com/store/apps/details?id=com.zerodha.kite3&pli=1"
        }
        appStore={
          "https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802"
        }
        heading={"Kite"}
        description={
          "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        }
      />
      <Rightsection
        image={"/Media/images/console.png"}
        heading={"Console"}
        learnMore={"Learn more"}
        description={
          "The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        }
      />
      <Leftsection
        image={"/Media/images/coin.png"}
        heading={"Coin"}
        tryDemo={"#"}
        learnMore={"#"}
        playStore={
          "https://play.google.com/store/apps/details?id=com.zerodha.kite3&pli=1"
        }
        appStore={
          "https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802"
        }
        description={
          "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        }
      />
      <Rightsection
        image={"/Media/images/kiteconnect.png"}
        heading={"Kite Connect API"}
        learnMore={"Kite Connect"}
        description={
          "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        }
      />
      <Leftsection
        image={"/Media/images/varsity.png"}
        heading={"Varsity mobile"}
        description={
          "An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        }
        tryDemo={"#"}
        learnMore={"#"}
        playStore={
          "https://play.google.com/store/apps/details?id=com.zerodha.kite3&pli=1"
        }
        appStore={
          "https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802"
        }
      />
      <Universe />
    </div>
  );
}

export default ProductPage;
