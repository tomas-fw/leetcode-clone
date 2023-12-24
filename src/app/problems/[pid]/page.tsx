import Topbar from '@/components/Topbar';
import { problems } from '@/data/problems';
import { fetchProblemFromDb, fetchStaticProblems } from '@/services/server-services/problems';
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
    const problemDataFromDb = await fetchProblemFromDb(params.pid);

    if (!problem || !problemDataFromDb) {
        return notFound();
    }

    problem.handlerFunction = problem.handlerFunction.toString();

    return (
        <div>
            <Topbar problemPage />
            <Workspace problem={problem} problemData={problemDataFromDb} />
        </div>
    );
};

export default Problem;
