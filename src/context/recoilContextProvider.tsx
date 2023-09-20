'use client';

import type { FC, PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

const RecoilContextProvider: FC<PropsWithChildren> = ({ children }) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContextProvider;
