'use client';

import Split from 'react-split';
import ProblemDescription from '../ProblemDescription';

type Props = {};
const Workspace = (props: Props) => {
    return (
        <Split className='split'>
            <ProblemDescription />
            <div>The code editor will be here</div>
        </Split>
    );
};

export default Workspace;
