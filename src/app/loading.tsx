import Topbar from '@/components/Topbar';
import { For } from '@/components/flow-control';

const LoadingSkeleton = () => {
    return (
        <div className='flex items-center space-x-12 mt-4 px-6'>
            <div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
            <div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
            <div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
            <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
            <span className='sr-only'>Loading...</span>
        </div>
    );
};

const Loading = () => {
    return (
        <main className='bg-dark-layer-2 min-h-screen'>
            <Topbar />
            <h1 className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5'>
                &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
            </h1>

            <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
                <For of={Array.from({ length: 10 })}>{(_, i) => <LoadingSkeleton key={i} />}</For>
            </div>
        </main>
    );
};

export default Loading;
