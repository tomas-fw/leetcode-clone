import type { FC, ReactElement } from 'react';
import { Otherwise, When } from '.';

interface Props {
    children: ReactElement[];
}

const Choose: FC<Props> = ({ children }) => {
    for (const child of children) {
        if (child.type === When && child.props.condition) {
            return child;
        }

        if (child.type === Otherwise) {
            return child;
        }
    }
    return null;
};

export default Choose;
