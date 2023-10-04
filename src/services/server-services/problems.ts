import { problems } from '@/data/problems';
import { fireStore } from '@/firebase/firebase';
import { Problem, ProlemTable } from '@/types/problem';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';

export const fetchStaticProblems = async (pid: string): Promise<Problem | undefined> => {
    return problems[pid];
};

export const fetchProblemsFromDb = async (): Promise<ProlemTable[]> => {
    const q = query(collection(fireStore, 'problems'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const temp: ProlemTable[] = [];
    querySnapshot.forEach((doc) => {
        temp.push({
            ...(doc.data() as ProlemTable),
        });
    });
    return temp;
};

export const fetchProblemFromDb = async (pid: string): Promise<ProlemTable | undefined> => {
    const docRef = doc(fireStore, 'problems', pid);
    const docSnap = await getDoc(docRef);
    const problem = docSnap.exists() ? (docSnap.data() as ProlemTable) : undefined;
    return problem;
};
