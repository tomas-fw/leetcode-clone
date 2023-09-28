import { problems } from '@/data/problems';
import { Problem } from '@/types/problem';

export const fetchStaticProblems = async (pid: string): Promise<Problem | undefined> => {
    return problems[pid];
};
