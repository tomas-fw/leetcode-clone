'use client';

import { For, If } from '@/components/flow-control';
import { problems } from '@/data/problems';
import { auth, fireStore } from '@/firebase/firebase';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Problem } from '@/types/problem';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import clsx from 'clsx';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Split from 'react-split';
import { toast } from 'react-toastify';
import EditorFooter from '../EditorFooter';
import PreferencesNav from '../PreferenceNav';

type Props = {
    problem: Problem;
    onSuccess: () => void;
};

export type TSettings = {
    fontSize: '12px' | '13px' | '14px' | '15px' | '16px' | '17px' | '18px';
    settingModalIsOpen: boolean;
    dropDownIsOpen: boolean;
};

export type TFontSize = TSettings['fontSize'];

const Playground = ({ problem, onSuccess }: Props) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState(0);
    const [userCode, setUserCode] = useState<string>(() => problem.starterCode);
    const [savedFontSize, setSavedFontSize] = useLocalStorage<TFontSize>('fontSize', '16px');
    const [settings, setSettings] = useState<TSettings>({
        fontSize: savedFontSize,
        settingModalIsOpen: false,
        dropDownIsOpen: false,
    });
    const [user] = useAuthState(auth);

    useEffect(() => {
        const userCode = localStorage.getItem(`code-${problem.id}`);
        if (user && userCode) {
            setUserCode(userCode);
        }
    }, [problem.id, user]);

    useEffect(() => {
        setSavedFontSize(settings.fontSize);
    }, [setSavedFontSize, settings.fontSize]);

    const handleSubmit = async () => {
        if (!user) {
            toast.error('You need to login to submit your code', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'dark',
            });
            return;
        }

        try {
            const functionStartsAt = userCode.indexOf(problem.starterFunctionName);
            const updatedUserCode = userCode.slice(functionStartsAt);
            const cb = new Function(`return ${updatedUserCode}`)();
            const handler = problems[problem.id].handlerFunction;
            if (typeof handler !== 'function') throw new Error('Handler function not found');
            const success = handler(cb);

            if (!success) throw new Error('One or more test cases failed');
            toast.success('Your code is correct', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'dark',
            });

            onSuccess();
            const userRef = doc(fireStore, 'users', user.uid);
            await updateDoc(userRef, {
                solvedProblems: arrayUnion(problem.id),
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Oops! One or more test cases failed!', {
                    position: 'top-center',
                    autoClose: 3000,
                    theme: 'dark',
                });
            }
        }
    };

    const handleChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${problem.id}`, value);
    };

    const handleSettings = (settingsArgs: Partial<TSettings>) => {
        setSettings({
            ...settings,
            ...settingsArgs,
        });
    };

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferencesNav settings={settings} setSettings={handleSettings} />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[61, 40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        extensions={[javascript()]}
                        style={{ fontSize: settings.fontSize }}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full px-5 overflow-auto'>
                    {/* Test Case heading */}
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className='text-sm font-medium leading-5 text-white'>Test cases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded border-none bg-white' />
                        </div>
                    </div>
                    {/* Test Case heading */}
                    <div className='flex'>
                        <For of={problem.examples}>
                            {(example, index) => (
                                <div
                                    className='mr-2 items-start mt-2 text-white'
                                    key={example.id}
                                    onClick={() => setActiveTestCaseId(index)}
                                >
                                    <div className='flex items-center flex-wrap gap-y-4'>
                                        <div
                                            className={clsx(
                                                'font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap',
                                                {
                                                    'text-gray-500': activeTestCaseId !== index,
                                                    'text-white': activeTestCaseId === index,
                                                }
                                            )}
                                        >
                                            Case {index + 1}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                    <div className='font-semibold my-4'>
                        <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            <If condition={!!problem.examples[activeTestCaseId].inputText}>
                                <>{problem.examples[activeTestCaseId].inputText}</>
                            </If>
                        </div>
                        <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            <If condition={!!problem.examples[activeTestCaseId].outputText}>
                                <>{problem.examples[activeTestCaseId].outputText}</>
                            </If>
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit} />
        </div>
    );
};

export default Playground;
