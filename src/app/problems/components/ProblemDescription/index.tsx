'use client';

import { Choose, For, If, Otherwise, When } from '@/components/flow-control';
import { auth, fireStore } from '@/firebase/firebase';
import { useFetchUserProblemInteraction } from '@/services/client-services/useFetchUserDataOnProblem';
import { Problem, ProlemTable } from '@/types/problem';
import clsx from 'clsx';
import { Transaction, arrayRemove, arrayUnion, doc, runTransaction, updateDoc } from 'firebase/firestore';
import { sanitize } from 'isomorphic-dompurify';
import Image from 'next/image';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillDislike, AiFillLike, AiFillStar, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

type Props = {
    problem: Problem;
    problemData: ProlemTable;
};

const ProblemDescription = ({ problem, ...rest }: Props) => {
    const [problemStatistics, setProblemStatistics] = useState(() => rest.problemData);
    const [updating, setUpdating] = useState(false);

    const [user] = useAuthState(auth);
    const { disliked, liked, solved, starred, setUserProblemInteraction } = useFetchUserProblemInteraction(
        problem.id,
        user?.uid
    );

    const getUserAndProblemDoc = async (userId: string, transaction: Transaction) => {
        const userRef = doc(fireStore, 'users', userId);
        const problemRef = doc(fireStore, 'problems', problem.id);
        const userDoc = await transaction.get(userRef);
        const problemDoc = await transaction.get(problemRef);
        return { userDoc, problemDoc, userRef, problemRef };
    };

    const handleLike = async () => {
        if (!user) {
            toast.error('You need to login to like a problem', { position: 'top-left', theme: 'dark' });
            return;
        }
        if (updating) return;
        setUpdating(true);

        await runTransaction(fireStore, async (transaction) => {
            const { problemDoc, userDoc, problemRef, userRef } = await getUserAndProblemDoc(user.uid, transaction);
            if (!userDoc.exists() || !problemDoc.exists()) return;
            if (liked) {
                // remove problem id from liked problems on user doc, decrement likes on problem doc
                transaction.update(userRef, {
                    likedProblems: userDoc.data()?.likedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    likes: problemDoc.data()?.likes - 1,
                });
                setUserProblemInteraction((prev) => ({ ...prev, liked: false }));
                setProblemStatistics((prev) => ({ ...prev, likes: prev.likes - 1 }));
            } else if (disliked) {
                transaction.update(userRef, {
                    likedProblems: [...userDoc.data()?.likedProblems, problem.id],
                    dislikedProblems: userDoc.data()?.dislikedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    likes: problemDoc.data()?.likes + 1,
                    dislikes: problemDoc.data()?.dislikes - 1,
                });
                setUserProblemInteraction((prev) => ({ ...prev, liked: true, disliked: false }));
                setProblemStatistics((prev) => ({ ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }));
            } else {
                transaction.update(userRef, {
                    likedProblems: [...userDoc.data()?.likedProblems, problem.id],
                });
                transaction.update(problemRef, {
                    likes: problemDoc.data()?.likes + 1,
                });

                setUserProblemInteraction((prev) => ({ ...prev, liked: true }));
                setProblemStatistics((prev) => ({ ...prev, likes: prev.likes + 1 }));
            }
        });
        setUpdating(false);
    };

    const handleDislike = async () => {
        if (!user) {
            toast.error('You need to login to dislike a problem', { position: 'top-left', theme: 'dark' });
            return;
        }
        if (updating) return;
        setUpdating(true);

        await runTransaction(fireStore, async (transaction) => {
            const { problemDoc, userDoc, problemRef, userRef } = await getUserAndProblemDoc(user.uid, transaction);
            if (!userDoc.exists() || !problemDoc.exists()) return;
            // already disliked,already liked, neither
            if (disliked) {
                transaction.update(userRef, {
                    dislikedProblems: userDoc.data()?.dislikedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data()?.dislikes - 1,
                });
                setUserProblemInteraction((prev) => ({ ...prev, disliked: false }));
                setProblemStatistics((prev) => ({ ...prev, dislikes: prev.dislikes - 1 }));
            } else if (liked) {
                transaction.update(userRef, {
                    dislikedProblems: [...userDoc.data()?.dislikedProblems, problem.id],
                    likedProblems: userDoc.data()?.likedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data()?.dislikes + 1,
                    likes: problemDoc.data()?.likes - 1,
                });
                setUserProblemInteraction((prev) => ({ ...prev, disliked: true, liked: false }));
                setProblemStatistics((prev) => ({ ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }));
            } else {
                transaction.update(userRef, {
                    dislikedProblems: [...userDoc.data()?.dislikedProblems, problem.id],
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data()?.dislikes + 1,
                });
                setUserProblemInteraction((prev) => ({ ...prev, disliked: true }));
                setProblemStatistics((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
            }
        });
        setUpdating(false);
    };

    const handleFavorite = async () => {
        if (!user) {
            toast.error('You need to login to dislike a problem', { position: 'top-left', theme: 'dark' });
            return;
        }
        if (updating) return;
        setUpdating(true);

        const userRef = doc(fireStore, 'users', user.uid);
        if (!starred) {
            await updateDoc(userRef, {
                starredProblems: arrayUnion(problem.id),
            });
            setUserProblemInteraction((prev) => ({ ...prev, starred: true }));
        } else {
            await updateDoc(userRef, {
                starredProblems: arrayRemove(problem.id),
            });
            setUserProblemInteraction((prev) => ({ ...prev, starred: false }));
        }

        setUpdating(false);
    };

    return (
        <div className='bg-dark-layer-1'>
            {/* TAB */}
            <div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
                <div className={'bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer'}>
                    Description
                </div>
            </div>

            <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
                <div className='px-5'>
                    {/* Problem heading */}
                    <div className='w-full'>
                        <div className='flex space-x-4'>
                            <div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
                        </div>
                        <div className='flex items-center mt-3'>
                            <div
                                className={clsx(
                                    'inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize ',
                                    {
                                        'text-olive bg-olive': problemStatistics.difficulty === 'Easy',
                                        'text-dark-yellow bg-dark-yellow': problemStatistics.difficulty === 'Medium',
                                        'text-dark-pink bg-dark-pink': problemStatistics.difficulty === 'Hard',
                                    }
                                )}
                            >
                                {problemStatistics.difficulty}
                            </div>
                            <If condition={solved}>
                                <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
                                    <BsCheck2Circle />
                                </div>
                            </If>
                            <div
                                className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                                onClick={handleLike}
                            >
                                <Choose>
                                    <When condition={updating}>
                                        <AiOutlineLoading3Quarters className='animate-spin' />
                                    </When>
                                    <When condition={liked}>
                                        <AiFillLike className='text-dark-blue-s' />
                                    </When>
                                    <Otherwise>
                                        <AiFillLike />
                                    </Otherwise>
                                </Choose>
                                <span className='text-xs'>{problemStatistics.likes}</span>
                            </div>
                            <div
                                className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
                                onClick={handleDislike}
                            >
                                <Choose>
                                    <When condition={updating}>
                                        <AiOutlineLoading3Quarters className='animate-spin' />
                                    </When>
                                    <When condition={disliked}>
                                        <AiFillDislike className='text-dark-pink' />
                                    </When>
                                    <Otherwise>
                                        <AiFillDislike />
                                    </Otherwise>
                                </Choose>
                                <span className='text-xs'>{problemStatistics.dislikes}</span>
                            </div>
                            <div
                                className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
                                onClick={handleFavorite}
                            >
                                <Choose>
                                    <When condition={updating}>
                                        <AiOutlineLoading3Quarters className='animate-spin' />
                                    </When>
                                    <When condition={starred}>
                                        <AiFillStar className='text-dark-yellow ' />
                                    </When>
                                    <Otherwise>
                                        <TiStarOutline />
                                    </Otherwise>
                                </Choose>
                            </div>
                        </div>

                        {/* Problem Statement(paragraphs) */}
                        <div className='text-white text-sm'>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitize(problem.problemStatement),
                                }}
                            />
                        </div>

                        {/* Examples */}
                        <div className='mt-4'>
                            {/* Example 1 */}
                            <For of={problem.examples}>
                                {(example, index) => (
                                    <div key={example.id}>
                                        <p className='font-medium text-white '>Example {index + 1}: </p>
                                        <If condition={!!example.img}>
                                            <Image
                                                src={example.img!}
                                                width={300}
                                                height={300}
                                                alt='example image'
                                                className='mt-3'
                                            />
                                        </If>
                                        <div className='example-card'>
                                            <pre>
                                                <strong className='text-white'>Input: </strong> {example.inputText}
                                                <br />
                                                <strong>Output:</strong> {example.outputText} <br />
                                                <If condition={!!example.explanation}>
                                                    <>
                                                        <strong>Explanation:</strong>
                                                        {example.explanation}
                                                    </>
                                                </If>
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>

                        {/* Constraints */}
                        <div className='my-8 pb-2'>
                            <div className='text-white text-sm font-medium'>Constraints:</div>
                            <ul className='text-white ml-5 list-disc'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: sanitize(problem.constraints),
                                    }}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;
