import '@/front/styles/globals.css';
import "primereact/resources/primereact.min.css";
import type { AppProps } from 'next/app';
import Template from '../components/template/template';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if(router.pathname === '/'){
    return <Component {...pageProps} />
  }
  else{
    return (
      <>
        <Template>
          <Component {...pageProps} />
        </Template>
      </>
    );
  }
}
