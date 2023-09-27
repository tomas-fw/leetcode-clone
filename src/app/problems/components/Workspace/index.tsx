'use client';

import Split from 'react-split';
import Playground from '../Playground';
import ProblemDescription from '../ProblemDescription';

type Props = {};
const Workspace = (props: Props) => {
    return (
        <Split className='split' minSize={0}>
            <ProblemDescription />
            <Playground />
        </Split>
    );
};

export default Workspace;
