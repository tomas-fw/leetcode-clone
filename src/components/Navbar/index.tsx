'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const setAuthModalState = useAuthModalRecoilUpdate();

    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, isOpen: true }));
    };
    return (
        <div className='flex item-center justify-between sm:px-12 px-2 md:px-24'>
            <Link href='/' className='flex items-center justify-center h-20'>
                <Image src='/images/logo.png' alt='logo' width={200} height={200} draggable={false} />
            </Link>
            <div className='flex items-center'>
                <button
                    className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                '
                    onClick={handleClick}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Navbar;
