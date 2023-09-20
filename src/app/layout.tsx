import RecoilContextProvider from '@/context/recoilContextProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <RecoilContextProvider>{children}</RecoilContextProvider>
            </body>
        </html>
    );
}
