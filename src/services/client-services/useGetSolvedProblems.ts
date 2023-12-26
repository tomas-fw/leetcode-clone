import { auth, fireStore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const useGetSolvedProblems = () => {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getSolvedProblems = async () => {
            if (!user) {
                setSolvedProblems([]);
                return;
            }
            const userRef = doc(fireStore, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) return;
            const userSolvedProblems = userDoc.data()?.solvedProblems;
            if (!userSolvedProblems) return;
            setSolvedProblems(userSolvedProblems);
        };
        getSolvedProblems();
    }, [user]);

    return solvedProblems;
};

export default useGetSolvedProblems;
