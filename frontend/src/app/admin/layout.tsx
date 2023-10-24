import Template from '@/components/template/template';
import { useState } from 'react'; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState();

    return (
        <>
            <Template>
                { children }
            </Template>
        </>
    );
}