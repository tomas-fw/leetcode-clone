import { Problem } from '@/types/problem';
import { jumpGame } from './jump-game';
import { reverseLinkedList } from './reverse-linked-list';
import { search2DMatrix } from './search-a-2d-matrix';
import { twoSum } from './two-sum';
import { validParentheses } from './valid-parentheses';

type ProblemMap = {
    [key: string]: Problem;
};

export const problems: ProblemMap = {
    'two-sum': twoSum,
    'jump-game': jumpGame,
    'reverse-linked-list': reverseLinkedList,
    'valid-parentheses': validParentheses,
    'search-a-2d-matrix': search2DMatrix,
};
