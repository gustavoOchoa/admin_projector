import { createContext, useContext, useState } from 'react';
import { appContextinter, contextProps } from '@/types/types'; 

const AppContext = createContext<appContextinter>({
    username: null,
    email: null,
    userType: null,
    avatar: null
});

export const AppContextProvider = ({ children }: contextProps ) => {
    const [username, setUsername] = useState({
        username: null,
        email: null,
        userType: null,
        avatar: null
    });
    
    return(
        <AppContext.Provider value={{
            username: null,
            email: null,
            userType: null,
            avatar: null
        }} >
            { children }
        </AppContext.Provider>
    );
}

export default AppContext;