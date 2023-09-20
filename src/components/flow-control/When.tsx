import type { FC, ReactElement } from 'react';
interface Props {
    condition: boolean;
    children: ReactElement | ReactElement[];
}

const When: FC<Props> = ({ children, condition }) => {
    // const [isConditionMet, setIsConditionMet] = useState(false);

    // useEffect(() => {
    //     setIsConditionMet(condition);
    // }, [condition]);

    if (!condition) return null;

    return <>{children}</>;
};

export default When;
