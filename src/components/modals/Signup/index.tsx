'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { allFieldsFilled } from '../../../../utils/form-validation';

const Signup = () => {
    const setAuthModalState = useAuthModalRecoilUpdate();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();
    const [inputs, setInputs] = useState({
        email: '',
        displayName: '',
        password: '',
    });

    useEffect(() => {
        if (error) {
            alert(error.message);
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
            alert('Please fill all the fields');
            return;
        }

        try {
            const user = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!user) return;
            console.log('🚀 ~ file: index.tsx:39 ~ handleSubmit ~ user:', user);
            router.push('/');
        } catch (error) {
            console.log('error :>> ', error);
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
