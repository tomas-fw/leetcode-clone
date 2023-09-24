'use client';

import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecoilContextProvider from './recoilContextProvider';

const RootContext: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <RecoilContextProvider>
                {children}
                <ToastContainer />
            </RecoilContextProvider>
        </>
    );
};

export default RootContext;
