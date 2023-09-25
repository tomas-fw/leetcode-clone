import Topbar from '@/components/Topbar';
import { NextPage } from 'next';
import Workspace from '../components/Workspace';

const Problem: NextPage = () => {
    return (
        <div>
            <Topbar problemPage />
            <h1>Problem</h1>
            <Workspace />
        </div>
    );
};

export default Problem;
