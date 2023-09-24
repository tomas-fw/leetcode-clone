'use client';

import { auth } from '@/firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';
type Props = {};

const Logout = (props: Props) => {
    const [signOut, loading, error] = useSignOut(auth);

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
            <FiLogOut />
        </button>
    );
};

export default Logout;
