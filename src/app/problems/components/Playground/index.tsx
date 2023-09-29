'use client';

import { For, If } from '@/components/flow-control';
import { Problem } from '@/types/problem';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import clsx from 'clsx';
import { useState } from 'react';
import Split from 'react-split';
import EditorFooter from '../EditorFooter';
import PreferencesNav from '../PreferenceNav';

type Props = {
    problem: Problem;
};

const Playground = ({ problem }: Props) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState(0);

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferencesNav />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[61, 40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={problem.starterCode}
                        theme={vscodeDark}
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
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
            <EditorFooter />
        </div>
    );
};

export default Playground;
