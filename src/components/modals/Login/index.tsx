'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';

const Login = () => {
    const setAuthModalState = useAuthModalRecoilUpdate();

    const handleClick = (type: 'forgotPassword' | 'register') => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };
    return (
        <form className='space-y-6 px-6 pb-4'>
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
                Login
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