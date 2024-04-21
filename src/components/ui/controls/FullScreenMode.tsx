import { useEffect } from 'react';
import { FULLSCREEN_DIV_ID } from 'src/types';

export interface IFullScreenModeProps {
    onFullScreenToggle: (state: boolean) => void;
    fullScreen: boolean;
}

export function FullScreenMode({ onFullScreenToggle, fullScreen }: IFullScreenModeProps) {

    const fullScreenElement = document.getElementById(FULLSCREEN_DIV_ID);

    useEffect(() => {
        console.log(fullScreen, fullScreenElement);
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
    }, [fullScreen]);

    useEffect(() => {
        document.addEventListener('fullscreenchange', (ev) => handleFullScreenExit(ev));
        return () => {
            document.removeEventListener('fullscreenchange', (ev) => handleFullScreenExit(ev));
        };
    }, []);

    function handleFullScreenExit(ev: Event) {
        if (document.fullscreenElement === null) {
            onFullScreenToggle(false);
        }
    }

    return null;
}
