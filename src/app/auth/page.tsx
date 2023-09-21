'use client';

import { useAuthModalRecoil } from '@/atoms/auth-modal-atom';
import Navbar from '@/components/Navbar';
import { If } from '@/components/flow-control';
import AuthModal from '@/components/modals/AuthModal';
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import heroImage from '/public/images/hero.png';
const AuthPage = () => {
    const { isOpen } = useAuthModalRecoil();
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (user) router.push('/');
        if (!loading && !user) setPageLoading(false);
    }, [loading, router, user]);

    if (pageLoading) return null;

    return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none'>
                    <Image src={heroImage} alt='hero image' />
                </div>
                <If condition={isOpen}>
                    <AuthModal />
                </If>
            </div>
        </div>
    );
};

export default AuthPage;
