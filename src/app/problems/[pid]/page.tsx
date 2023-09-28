import Topbar from '@/components/Topbar';
import { problems } from '@/data/problems';
import { fetchStaticProblems } from '@/services/problems';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Workspace from '../components/Workspace';

export const generateStaticParams = () => {
    const keys = Object.keys(problems);
    return keys.map((key) => ({
        pid: key,
    }));
};

type Props = {
    params: { pid: string };
};

const Problem: NextPage<Props> = async ({ params }) => {
    const problem = await fetchStaticProblems(params.pid);

    if (!problem) {
        return notFound();
    }

    problem.handlerFunction = problem.handlerFunction.toString();
    return (
        <div>
            <Topbar problemPage />
            <Workspace problem={problem} />
        </div>
    );
};

export default Problem;
