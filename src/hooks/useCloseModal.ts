import { useAuthModalRecoil, useAuthModalRecoilUpdate } from '@/atoms/auth-modal-atom';
import { useCallback, useEffect } from 'react';

const useCloseModal = () => {
    const { isOpen } = useAuthModalRecoil();
    const setAuthModalState = useAuthModalRecoilUpdate();

    const closeModal = useCallback(() => {
        setAuthModalState((prev) => ({ ...prev, isOpen: false, type: 'login' }));
    }, [setAuthModalState]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) closeModal();
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeModal, isOpen]);

    return closeModal;
};

export default useCloseModal;
