import Template from '@/components/template/template';

export default function adminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Template>
            { children }
        </Template>
        </>
    );
}