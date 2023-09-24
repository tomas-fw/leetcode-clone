'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { auth } from '@/firebase/firebase';
import { FormEvent, useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const setAuthModalState = useAuthModalRecoilUpdate();
    // TODO: delete default email
    const [email, setEmail] = useState('hicar50336@ipniel.com');
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (!email) return;
        e.preventDefault();
        try {
            const success = await sendPasswordResetEmail(email);
            if (success) toast.success('Password reset email sent', { position: 'top-center', autoClose: 3000 });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
        }
    }, [error]);
    return (
        <form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handlesubmit}>
            <h3 className='text-xl font-medium  text-white'>Reset Password</h3>
            <p className='text-sm text-white '>
                Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
                to reset it.
            </p>
            <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Your email
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                    placeholder='name@company.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sending}
                />
            </div>

            <button
                type='submit'
                className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            bg-brand-orange hover:bg-brand-orange-s `}
                disabled={sending}
            >
                Reset Password
            </button>
        </form>
    );
};

export default ResetPassword;
