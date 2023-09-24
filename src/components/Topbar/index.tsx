'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../butons/Logout';
import { Choose, Otherwise, When } from '../flow-control';
import avatar from '/public/images/avatar.png';
import logo from '/public/images/logo.png';
type Props = {};

const Topbar = (props: Props) => {
    const [user] = useAuthState(auth);
    const setAuthModalState = useAuthModalRecoilUpdate();

    const handleSignIn = () => {
        setAuthModalState((prev) => ({ ...prev, type: 'login', isOpen: true }));
    };

    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
            <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}>
                <Link href='/' className='h-[22px] flex-1'>
                    <Image src={logo} alt='Logo' className='h-full' />
                </Link>

                <div className='flex items-center space-x-4 flex-1 justify-end'>
                    <div>
                        <a
                            href='https://www.buymeacoffee.com/burakorkmezz'
                            target='_blank'
                            rel='noreferrer'
                            className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
                        >
                            Premium
                        </a>
                    </div>
                    <Choose>
                        <When condition={!user}>
                            <Link href='/auth' onClick={handleSignIn}>
                                <button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
                            </Link>
                        </When>
                        <Otherwise>
                            <div className='cursor-pointer group relative'>
                                <Image src={avatar} alt='avatar image' className='h-8 w-8 rounded-full' />
                                <div
                                    className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 
                                    group-hover:scale-100 scale-0 
		                            transition-all duration-300 ease-in-out'
                                >
                                    <p className='text-sm'>{user?.email}</p>
                                </div>
                            </div>
                            <Logout />
                        </Otherwise>
                    </Choose>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;
