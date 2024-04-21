import { Divider, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { ToolbarSectionsSettings } from "./ToolbarSectionsSettings";
import { ToolbarDoorsSettings } from "./ToolbarDoorsSettings";
import { ToolbarDoorsPartsSettings } from "./ToolbarDoorsPartsSettings";
import { ToolbarPreviewSettings } from "./ToolbarPreviewSettings";
import { ToolbarWardrobeSettings } from "./ToolbarWardrobeSettings";
import { LanguageSettings } from "./LanguageSettings";
import { QualitySettings } from "./QualitySettings";
import VerticalShadesClosedIcon from '@mui/icons-material/VerticalShadesClosed';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import PreviewIcon from '@mui/icons-material/Preview';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { FullScreenMode } from "./FullScreenMode";

export function Toolbar() {

    const theme = useTheme();
    const textVisible = useMediaQuery(theme.breakpoints.up('sm'));

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [settings, setSettings] = useState<string>("wardrobe");
    const [fullScreen, setFullScreen] = useState<boolean>(false);

    const [extraSettings, setExtraSettings] = useState<string>("");

    function handleExtraSettings(_: React.MouseEvent<HTMLElement>, newSetting: string | null) {
        if (newSetting !== null) {
            setSettings("");
            setExtraSettings(newSetting);
        }
    }

    function handleSettings(_: React.MouseEvent<HTMLElement>, newSetting: string | null) {
        if (newSetting !== null) {
            setSettings(newSetting);
            setExtraSettings("");
            switch (newSetting) {
                case "wardrobe":
                    dispatch(wardrobeAppActions.setDoorsVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setSectionsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsMoveBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsPartsClickBoxesVisibility({ visible: false }));
                    break;
                case "sections":
                    dispatch(wardrobeAppActions.setDoorsVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setSectionsClickBoxesVisibility({ visible: true }));
                    dispatch(wardrobeAppActions.setDoorsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsMoveBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsPartsClickBoxesVisibility({ visible: false }));
                    break;
                case "doors":
                    dispatch(wardrobeAppActions.setDoorsVisibility({ visible: true }));
                    dispatch(wardrobeAppActions.setSectionsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsClickBoxesVisibility({ visible: true }));
                    dispatch(wardrobeAppActions.setDoorsMoveBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsPartsClickBoxesVisibility({ visible: false }));
                    break;
                case "doorsParts":
                    dispatch(wardrobeAppActions.setDoorsVisibility({ visible: true }));
                    dispatch(wardrobeAppActions.setSectionsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsMoveBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsPartsClickBoxesVisibility({ visible: true }));
                    break;
                case "preview":
                    dispatch(wardrobeAppActions.setDoorsVisibility({ visible: true }));
                    dispatch(wardrobeAppActions.setSectionsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsClickBoxesVisibility({ visible: false }));
                    dispatch(wardrobeAppActions.setDoorsMoveBoxesVisibility({ visible: true }));
                    dispatch(wardrobeAppActions.setDoorsPartsClickBoxesVisibility({ visible: false }));
                    break;
                case "settings":
                    break;
            }
        }
    }

    return (
        <Paper sx={{
            p: .5,
            borderRadius: .5
        }}>
            <FullScreenMode onFullScreenToggle={setFullScreen} fullScreen={fullScreen} />
            <Stack flexDirection="row" gap={1} sx={{ pb: 1 }}>
                <ToggleButton size="small" color="warning"
                    value="fullscreen"
                    title={t('button.fullScreen')}
                    onClick={() => setFullScreen(!fullScreen)}
                >
                    {
                        fullScreen ?
                            <FullscreenExitIcon fontSize="small" />
                            :
                            <FullscreenIcon fontSize="small" />
                    }
                </ToggleButton>
                <ToggleButtonGroup
                    size="small"
                    color="warning"
                    exclusive
                    value={settings}
                    onChange={handleSettings}
                >
                    <ToggleButton size="small" value="wardrobe"
                        title={t('button.editWardrobe')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <ConstructionIcon fontSize="small" />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step1')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="sections"
                        title={t('button.editSections')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <VerticalShadesClosedIcon fontSize="small" />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step2')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="doors"
                        title={t('button.editDoors')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <DoorSlidingIcon fontSize="small" />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step3')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="doorsParts"
                        title={t('button.editDoorsParts')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <SplitscreenIcon fontSize="small" />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step4')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="preview"
                        title={t('button.preview')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <PreviewIcon fontSize="small" />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step5')}</Typography>}
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    size="small"
                    color="warning"
                    exclusive
                    value={extraSettings}
                    onChange={handleExtraSettings}
                >
                    <ToggleButton size="small" value="settings"
                        title={t('button.settings')}
                    // sx={{ p: '0.4rem' }}
                    // onClick={() => dispatch(wardrobeAppActions.toggleShadows())}
                    ><SettingsIcon fontSize="small" />
                    </ToggleButton>;
                </ToggleButtonGroup>
            </Stack>
            <Divider />
            <Stack flexDirection="row" gap={1} justifyContent='left' sx={{ pt: 1 }}>
                {settings === "wardrobe" &&
                    <ToolbarWardrobeSettings visibleText={textVisible} />
                }
                {settings === "sections" &&
                    <ToolbarSectionsSettings visibleText={textVisible} />
                }
                {settings === "doors" &&
                    <ToolbarDoorsSettings visibleText={textVisible} />
                }
                {settings === "doorsParts" &&
                    <ToolbarDoorsPartsSettings visibleText={textVisible} />
                }
                {settings === "preview" &&
                    <ToolbarPreviewSettings visibleText={textVisible} />
                }
                {extraSettings === "settings" &&
                    <Fragment>
                        <LanguageSettings visibleText={textVisible} />
                        <Divider flexItem orientation="vertical" sx={{ my: 0.5 }} />
                        <QualitySettings visibleText={textVisible} />
                    </Fragment>
                }
            </Stack>
        </Paper >
    );
}
