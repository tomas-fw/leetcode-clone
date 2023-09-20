import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type AuthModalState = {
    isOpen: boolean;
    type: 'login' | 'register' | 'forgotPassword';
};

const inisialAuthModalState: AuthModalState = {
    isOpen: false,
    type: 'login',
};

export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: inisialAuthModalState,
});

export const useAuthModalRecoil = () => useRecoilValue(authModalState);
export const useAuthModalRecoilUpdate = () => useSetRecoilState(authModalState);
