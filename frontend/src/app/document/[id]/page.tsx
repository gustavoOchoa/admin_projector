import api from '@/app/components/api/api';
import React from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { DocService } from '@/app/services/documentService';
import { useRouter } from'next/router';
import { ParsedUrlQuery } from 'querystring';

export default function Page(props: any) {
    const router = useRouter();
    console.log('params: ', router.query);
    console.log('props: ', props.repo);
    return <h1>My Page</h1>;
}


export const getServerSideProps: GetServerSideProps<{repo: any}> = async (context) => {
    const param = context.params;
    console.log(param?.id);
    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await res.json();
    //console.log(repo);
    return { props: { repo } };
};