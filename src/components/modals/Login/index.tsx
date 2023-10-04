'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { allFieldsFilled } from '../../../utils/form-validation';

const Login = () => {
    const setAuthModalState = useAuthModalRecoilUpdate();
    const router = useRouter();
    const [signInWithEmailAndPassword, loading, , error] = useSignInWithEmailAndPassword(auth);
    const [inputs, setInputs] = useState({
        email: 'hicar50336@ipniel.com',
        password: 'test123',
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
        }
    }, [error]);

    const handleClick = (type: 'forgotPassword' | 'register') => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!allFieldsFilled(inputs)) {
                toast.error('Please fill all fields', { position: 'top-center', autoClose: 3000 });
                return;
            }
            const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!user) return;
            router.push('/');
        } catch (error) {
            console.log('error :>> ', error);
        }
    };
    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleSubmit} noValidate>
            <h3 className='text-xl font-medium text-white'>Sign in to LeetClone</h3>
            <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Your Email
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='name@company.com'
                    onChange={handleChange}
                    value={inputs.email}
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                    p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                />
            </div>
            <div>
                <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                    Your Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='******'
                    onChange={handleChange}
                    value={inputs.password}
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                    p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                />
            </div>
            <button
                type='submit'
                className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            '
            >
                {loading ? 'Loading...' : 'Sign In'}
            </button>
            <button className='flex w-full justify-end' onClick={() => handleClick('forgotPassword')}>
                <a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
                    Forgot Pasword?
                </a>
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Not registered yet?{' '}
                <a href='#' className='text-blue-700 hover:underline' onClick={() => handleClick('register')}>
                    Create Account
                </a>
            </div>
        </form>
    );
};

export default Login;
