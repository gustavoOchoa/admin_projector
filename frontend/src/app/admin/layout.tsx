import Template from '@/components/template/template';
import { GlobalContextProvider } from '@/components/context/appContext'; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <GlobalContextProvider>
            <Template>
                { children }
            </Template>
        </GlobalContextProvider>
        </>
    );
}