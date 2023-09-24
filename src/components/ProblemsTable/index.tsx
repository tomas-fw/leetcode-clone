'use client';

import { problems } from '@/mock-data/problems';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTubePlayer from 'react-youtube';
import { For, If } from '../flow-control';

type Props = {};

const ProblemsTable = (props: Props) => {
    const [youtubeVideo, setYoutubeVideo] = useState({
        isOpen: false,
        videoId: '',
    });

    const handleCloseModal = () => {
        setYoutubeVideo({ isOpen: false, videoId: '' });
    };

    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setYoutubeVideo({ isOpen: false, videoId: '' });
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);
    return (
        <>
            <tbody className='text-white'>
                <For of={problems}>
                    {(problem, i) => {
                        const difficultyColor =
                            problem.difficulty === 'Easy'
                                ? 'text-dark-green-s'
                                : problem.difficulty === 'Medium'
                                ? 'text-dark-yellow'
                                : 'text-dark-pink';
                        return (
                            <tr className={`${i % 2 === 1 ? 'bg-dark-layer-1' : ''}`} key={problem.id}>
                                <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                    <BsCheckCircle fontSize='18' width='18' />
                                </th>
                                <td className='px-6 py-4'>
                                    <Link
                                        href={`/problems/${problem.id}`}
                                        className='hover:text-blue-600 cursor-pointer'
                                    >
                                        {problem.title}
                                    </Link>
                                </td>
                                <td className={`px-6 py-4 ${difficultyColor}`}>{problem.difficulty}</td>
                                <td className='px-6 py-4'>{problem.category}</td>
                                <td className='px-6 py-4'>
                                    {problem.videoId ? (
                                        <AiFillYoutube
                                            fontSize='28'
                                            className='cursor-pointer hover:text-red-600'
                                            onClick={() =>
                                                setYoutubeVideo({ isOpen: true, videoId: problem.videoId as string })
                                            }
                                        />
                                    ) : (
                                        <p className='text-gray-400'>Coming soon</p>
                                    )}
                                </td>
                            </tr>
                        );
                    }}
                </For>
            </tbody>
            <If condition={youtubeVideo.isOpen}>
                <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center '>
                    <div
                        className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
                        onClick={handleCloseModal}
                    ></div>
                    <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                        <div className='w-full h-full flex items-center justify-center relative'>
                            <div className='w-full relative'>
                                <IoClose
                                    fontSize={'35'}
                                    className='cursor-pointer absolute -top-16 right-0'
                                    onClick={handleCloseModal}
                                />
                                <YouTubePlayer
                                    videoId={youtubeVideo.videoId}
                                    loading='lazy'
                                    iframeClassName='w-full min-h-[500px]'
                                />
                            </div>
                        </div>
                    </div>
                </tfoot>
            </If>
        </>
    );
};

export default ProblemsTable;
