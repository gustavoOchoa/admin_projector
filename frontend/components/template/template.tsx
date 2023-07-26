import React, { useState } from 'react';
import Head from 'next/head';
import Menu from './menu';
import Header from './header';

export default function Template({ children }: { children: React.ReactNode }){
    const [visible, setVisible] = useState(false);

    return(
        <>
            <Head>
                <title>Projector</title>
            </Head>
            <div>
                <div className="flex mt-[4.7rem] md:mt-0">
                    <Menu 
                        menuVisible = {visible}
                    />
                    <div className="min-w-0 min-h-[98vh] flex-1 pb-10 bg-slate-800  max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
                        <Header 
                            setMenuVisible = {setVisible}
                        />
                        <div className="grid grid-cols-12 gap-6 px-4 py-4">
                            <div className="col-span-12 2xl:col-span-9">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}