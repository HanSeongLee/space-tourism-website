import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Bellefair, Barlow_Condensed, Barlow } from '@next/font/google';

const bellefair = Bellefair({
      weight: ['400'],
      subsets: ['latin'],
    },
);

const BarlowCondensed = Barlow_Condensed({
      weight: ['400', '700'],
      subsets: ['latin'],
    },
);

const barlow = Barlow({
        weight: ['400'],
        subsets: ['latin'],
    },
);

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
      :root {
        --bellefair-font: ${bellefair.style.fontFamily};
        --barlow-condensed-font: ${BarlowCondensed.style.fontFamily};
        --barlow-font: ${barlow.style.fontFamily};-
      }
    `}</style>
    <Component {...pageProps} />
  </>;
}

export default MyApp;
