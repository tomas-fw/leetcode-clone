'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { auth, fireStore } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { allFieldsFilled } from '../../../utils/form-validation';

const Signup = () => {
    const setAuthModalState = useAuthModalRecoilUpdate();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();
    const [inputs, setInputs] = useState({
        email: 'hicar50336@ipniel.com',
        password: 'test123',
        displayName: 'John Doe',
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
        }
    }, [error]);

    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: 'login' }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!allFieldsFilled(inputs)) {
            toast.error('Please fill all fields', { position: 'top-center', autoClose: 3000 });
            return;
        }

        try {
            toast.loading('Creating your account...', { position: 'top-center', toastId: 'loading' });
            const user = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!user) return;
            await setDoc(doc(fireStore, 'users', user.user.uid), {
                uid: user.user.uid,
                displayName: inputs.displayName,
                email: user.user.email,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            });
            router.push('/');
        } catch (error) {
            let errorMsg = 'Something went wrong';
            if (error instanceof Error) errorMsg = error.message;
            toast.error(errorMsg, { position: 'top-center', autoClose: 3000 });
            console.log('error :>> ', error);
        } finally {
            toast.dismiss('loading');
        }
    };
    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleSubmit} noValidate>
            <h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
            <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Email
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='name@company.com'
                    onChange={handleChange}
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                />
            </div>
            <div>
                <label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
                    Display Name
                </label>
                <input
                    type='displayName'
                    name='displayName'
                    id='displayName'
                    placeholder='John doe'
                    onChange={handleChange}
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                />
            </div>
            <div>
                <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='******'
                    onChange={handleChange}
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                />
            </div>
            <button
                type='submit'
                disabled={loading}
                className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        '
            >
                {loading ? 'Loading...' : 'Sign up'}
            </button>

            <div className='text-sm font-medium text-gray-300'>
                Already have an account?{' '}
                <a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
                    Log in
                </a>
            </div>
        </form>
    );
};

export default Signup;
