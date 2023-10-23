import api from '@/components/api/api';
import React from 'react';
import { DocService } from '@/services/documentService';
import { useParams } from'next/navigation';
import { ParsedUrlQuery } from 'querystring';

export default function Page(props: any) {
    const router = useParams();
    console.log('params: ', router.query);
    console.log('props: ', props.repo);
    return <h1>My Page</h1>;
}