import { Choose, If, Otherwise, When } from '@/components/flow-control';
import SettingsModal from '@/components/modals/SettingsModal';
import { FC, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { TSettings } from '../Playground';

type Props = {
    settings: TSettings;
    setSettings: (settings: Partial<TSettings>) => void;
};

const PreferenceNav: FC<Props> = ({ setSettings, settings }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFunctionFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    // useEffect(() => {
    //     const exitHandler = () => {
    //         if (!document.fullscreenElement) {
    //             setIsFullScreen(false);
    //             return;
    //         }
    //         setIsFullScreen(true);
    //     };
    //     if (document.addEventListener) {
    //         document.addEventListener('fullscreenchange', exitHandler, false);
    //         document.addEventListener('webkitfullscreenchange', exitHandler, false);
    //         document.addEventListener('mozfullscreenchange', exitHandler, false);
    //         document.addEventListener('MSFullscreenChange', exitHandler, false);
    //     }
    //     return () => {
    //         if (document.removeEventListener) {
    //             document.removeEventListener('fullscreenchange', exitHandler, false);
    //             document.removeEventListener('webkitfullscreenchange', exitHandler, false);
    //             document.removeEventListener('mozfullscreenchange', exitHandler, false);
    //             document.removeEventListener('MSFullscreenChange', exitHandler, false);
    //         }
    //     };
    // }, []);

    return (
        <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
            <div className='flex items-center text-white'>
                <button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium'>
                    <div className='flex items-center px-1'>
                        <div className='text-xs text-label-2 dark:text-dark-label-2'>JavaScript</div>
                    </div>
                </button>
            </div>

            <div className='flex items-center m-2'>
                <button className='preferenceBtn group' onClick={() => setSettings({ settingModalIsOpen: true })}>
                    <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                        <AiOutlineSetting />
                    </div>
                    <div className='preferenceBtn-tooltip'>Settings</div>
                </button>

                <button className='preferenceBtn group' onClick={handleFunctionFullScreen}>
                    <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                        <Choose>
                            <When condition={isFullScreen}>
                                <AiOutlineFullscreenExit />
                            </When>
                            <Otherwise>
                                <AiOutlineFullscreen />
                            </Otherwise>
                        </Choose>
                    </div>
                    <div className='preferenceBtn-tooltip'>Full Screen</div>
                </button>
            </div>
            <If condition={settings.settingModalIsOpen}>
                <SettingsModal settings={settings} setSettings={setSettings} />
            </If>
        </div>
    );
};

export default PreferenceNav;
