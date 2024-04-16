import { Divider, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { ToolbarSectionsSettings } from "./ToolbarSectionsSettings";
import { ToolbarDoorsSettings } from "./ToolbarDoorsSettings";
import { ToolbarDoorsPartsSettings } from "./ToolbarDoorsPartsSettings";
import { ToolbarPreviewSettings } from "./ToolbarPreviewSettings";
import { ToolbarWardrobeSettings } from "./ToolbarWardrobeSettings";
import { LanguageSettings } from "./LanguageSettings";
import VerticalShadesClosedIcon from '@mui/icons-material/VerticalShadesClosed';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import PreviewIcon from '@mui/icons-material/Preview';
import ConstructionIcon from '@mui/icons-material/Construction';
import { QualitySettings } from "./QualitySettings";

export function Toolbar() {

    const theme = useTheme();
    const textVisible = useMediaQuery(theme.breakpoints.up('sm'));

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [settings, setSettings] = useState<string>("wardrobe");

    function handleSettings(_: React.MouseEvent<HTMLElement>, newSetting: string | null) {
        if (newSetting !== null) {
            setSettings(newSetting);
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
            }
        }
    }

    return (
        <Paper sx={{
            p: .5,
            borderRadius: .5
        }}>
            <Stack flexDirection="row" gap={1} justifyContent='left' sx={{ pb: 1 }}>
                <LanguageSettings />
                <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
                <QualitySettings />
                <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
                <ToggleButtonGroup
                    size="small"
                    color="secondary"
                    exclusive
                    value={settings}
                    onChange={handleSettings}
                >
                    <ToggleButton size="small" value="wardrobe"
                        title={t('button.editWardrobe')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <ConstructionIcon />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step1')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="sections"
                        title={t('button.editSections')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <VerticalShadesClosedIcon />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step2')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="doors"
                        title={t('button.editDoors')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <DoorSlidingIcon />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step3')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="doorsParts"
                        title={t('button.editDoorsParts')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <SplitscreenIcon />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step4')}</Typography>}
                    </ToggleButton>
                    <ToggleButton size="small" value="preview"
                        title={t('button.preview')}
                        sx={{ p: .5, textWrap: 'nowrap' }}
                    >
                        <PreviewIcon />
                        {textVisible && <Typography sx={{ mx: 1 }}>{t('button.step5')}</Typography>}
                    </ToggleButton>
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
            </Stack>
        </Paper >
    );
}
