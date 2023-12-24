'use client';

import { useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { problems } from '@/data/problems';
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsList } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Logout from '../butons/Logout';
import { Choose, If, Otherwise, When } from '../flow-control';
import Timer from '../timer';
import avatar from '/public/images/avatar.png';
type Props = {
    problemPage?: boolean;
};

const Topbar: FC<Props> = ({ problemPage }) => {
    const [user] = useAuthState(auth);
    const params = useParams();
    const router = useRouter();
    const setAuthModalState = useAuthModalRecoilUpdate();

    const handleSignIn = () => {
        setAuthModalState((prev) => ({ ...prev, type: 'login', isOpen: true }));
    };

    const handleProblemChange = (page: number) => {
        const problemKey = params.pid as keyof typeof problems;
        const nextOrder = problems[problemKey].order + page;
        const problemList = Object.values(problems);
        const nextProblem = problemList.find((problem) => problem.order === nextOrder);

        let targetProblemKey;
        if (!nextProblem) {
            const problemKeys = Object.keys(problems);
            targetProblemKey = page > 0 ? problemKeys[0] : problemKeys[problemKeys.length - 1];
        } else {
            targetProblemKey = nextProblem.id;
        }

        router.push(`/problems/${targetProblemKey}`);
    };

    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
            <div className={`flex w-full items-center justify-between ${!problemPage ? 'max-w-[1200px] mx-auto' : ''}`}>
                <Link href='/' className='h-[22px] flex-1'>
                    <Image src='/images/logo-full.png' width={100} height={100} alt='Logo' />
                </Link>
                <If condition={!!problemPage}>
                    <div className='flex items-center gap-4 flex-1 justify-center'>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2
                        h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(-1)}
                        >
                            <FaChevronLeft />
                        </div>
                        <Link
                            href='/'
                            className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8
                        cursor-pointer
                        '
                        >
                            <div>
                                <BsList />
                            </div>
                            <p>Problem List</p>
                        </Link>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2
                        h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(1)}
                        >
                            <FaChevronRight />
                        </div>
                    </div>
                </If>

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
                            <If condition={!!problemPage}>
                                <Timer />
                            </If>
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
