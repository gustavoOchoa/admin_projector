"use client";
import { SetStateAction, createContext, useContext, useState, Dispatch } from 'react';

type UserType = {
    username: string | null
    email: string | null
    userType: string | null
    avatar: string | null
}

interface appContextinter{
    appData: UserType
    setAppdata: Dispatch<SetStateAction<any>>
}

const GlobalContext = createContext<appContextinter>({
    appData: {
        username: null,
        email: null,
        userType: null,
        avatar: null
    },
    setAppdata: (): any => {}
});

export const GlobalContextProvider = ({ children }: any) => {
    const [appData, setAppdata] = useState<UserType>({
        username: null,
        email: null,
        userType: null,
        avatar: null
    });

    return (
        <GlobalContext.Provider value={{ appData, setAppdata }}>
            { children }
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);