import { useCallback, useEffect } from 'react';
import { FULLSCREEN_DIV_ID } from 'src/types';

export interface IFullScreenModeProps {
    onFullScreenToggle: (state: boolean) => void;
    fullScreen: boolean;
}

export function FullScreenMode({ onFullScreenToggle, fullScreen }: IFullScreenModeProps) {

    const fullScreenElement = document.getElementById(FULLSCREEN_DIV_ID);

    useEffect(() => {
        if (fullScreen) {
            //if not in fullscreen mode - request fullscreen mode for element
            if (document.fullscreenElement === null) {
                if (fullScreenElement) {
                    fullScreenElement.requestFullscreen();
                }
            }
        } else {
            //if in fullscreenmode
            if (document.fullscreenElement !== null) {
                document.exitFullscreen();
            }
        }
    }, [fullScreen, fullScreenElement]);

    const handleFullScreenExit = useCallback(() => {
        if (document.fullscreenElement === null) {
            onFullScreenToggle(false);
        }
    }, []);


    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenExit);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenExit);
        };
    }, [handleFullScreenExit]);

    return null;
}
