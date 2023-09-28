'use client';

import { Problem } from '@/types/problem';
import Split from 'react-split';
import Playground from '../Playground';
import ProblemDescription from '../ProblemDescription';

type Props = {
    problem: Problem;
};
const Workspace = ({ problem }: Props) => {
    return (
        <Split className='split' minSize={0}>
            <ProblemDescription problem={problem} />
            <Playground problem={problem} />
        </Split>
    );
};

export default Workspace;
