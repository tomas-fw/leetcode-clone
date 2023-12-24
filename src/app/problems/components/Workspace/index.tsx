'use client';

import { If } from '@/components/flow-control';
import useHasMounted from '@/hooks/useHasMounted';
import useWindowSize from '@/hooks/useWindowSize';
import { Problem, ProlemTable } from '@/types/problem';
import { useState } from 'react';
import Confetti from 'react-confetti';
import Split from 'react-split';
import Playground from '../Playground';
import ProblemDescription from '../ProblemDescription';

type Props = {
    problem: Problem;
    problemData: ProlemTable;
};
const Workspace = ({ problem, problemData }: Props) => {
    const { width, height } = useWindowSize();
    const hasMounted = useHasMounted();
    const [success, setSuccess] = useState(false);

    if (!hasMounted) return null;
    return (
        <>
            <If condition={success}>
                <Confetti gravity={0.3} tweenDuration={4000} width={width} height={height} />
            </If>
            <Split className='split' minSize={0}>
                <ProblemDescription problem={problem} problemData={problemData} />
                <Playground problem={problem} />
            </Split>
        </>
    );
};

export default Workspace;
