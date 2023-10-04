import { fireStore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

export const useFetchUserProblemInteraction = (problemId: string, userId?: string) => {
    const [userProblemInteraction, setUserProblemInteraction] = useState({
        liked: false,
        disliked: false,
        solved: false,
        starred: false,
    });

    const checkIfArrayIncludesItem = useCallback((arr: string[], item: string) => arr.includes(item), []);

    const fetchUserProblemInteraction = useCallback(async () => {
        if (!userId) return;
        const userRef = doc(fireStore, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) return;
        const data = userSnap.data();
        const { solvedProblems, starredProblems, likedProblems, dislikedProblems } = data;
        setUserProblemInteraction({
            liked: checkIfArrayIncludesItem(likedProblems, problemId),
            disliked: checkIfArrayIncludesItem(dislikedProblems, problemId),
            solved: checkIfArrayIncludesItem(solvedProblems, problemId),
            starred: checkIfArrayIncludesItem(starredProblems, problemId),
        });
    }, [problemId, userId, checkIfArrayIncludesItem]);

    useEffect(() => {
        fetchUserProblemInteraction();

        return () => {
            setUserProblemInteraction({
                liked: false,
                disliked: false,
                solved: false,
                starred: false,
            });
        };
    }, [fetchUserProblemInteraction]);

    return { ...userProblemInteraction, setUserProblemInteraction };
};
