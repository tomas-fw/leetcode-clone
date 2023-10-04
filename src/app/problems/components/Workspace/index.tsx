'use client';

import { Problem, ProlemTable } from '@/types/problem';
import Split from 'react-split';
import Playground from '../Playground';
import ProblemDescription from '../ProblemDescription';

type Props = {
    problem: Problem;
    problemData: ProlemTable;
};
const Workspace = ({ problem, problemData }: Props) => {
    return (
        <Split className='split' minSize={0}>
            <ProblemDescription problem={problem} problemData={problemData} />
            <Playground problem={problem} />
        </Split>
    );
};

export default Workspace;
