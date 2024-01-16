import { Divider, Grid, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
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

export function Toolbar() {

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
            <Grid container alignItems='center' justifyContent="left" flexDirection='row' columnGap={1} rowGap={1}>
                <LanguageSettings />
                <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
                <Grid item>
                    <ToggleButtonGroup
                        size="small"
                        color="secondary"
                        exclusive
                        value={settings}
                        onChange={handleSettings}
                    >
                        <ToggleButton size="small" value="wardrobe"
                            title={t('button.editWardrobe')}
                            sx={{ p: .5 }}
                        >
                            <ConstructionIcon />
                        </ToggleButton>
                        <ToggleButton size="small" value="sections"
                            title={t('button.editSections')}
                            sx={{ p: .5 }}
                        >
                            <VerticalShadesClosedIcon />
                        </ToggleButton>
                        <ToggleButton size="small" value="doors"
                            title={t('button.editDoors')}
                            sx={{ p: .5 }}
                        >
                            <DoorSlidingIcon />
                        </ToggleButton>
                        <ToggleButton size="small" value="doorsParts"
                            title={t('button.editDoorsParts')}
                            sx={{ p: .5 }}
                        >
                            <SplitscreenIcon />
                        </ToggleButton>
                        <ToggleButton size="small" value="preview"
                            title={t('button.preview')}
                            sx={{ p: .5 }}
                        >
                            <PreviewIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
                {settings === "wardrobe" &&
                    <ToolbarWardrobeSettings />
                }
                {settings === "sections" &&
                    <ToolbarSectionsSettings />
                }
                {settings === "doors" &&
                    <ToolbarDoorsSettings />
                }
                {settings === "doorsParts" &&
                    <ToolbarDoorsPartsSettings />
                }
                {settings === "preview" &&
                    <ToolbarPreviewSettings />
                }
            </Grid>
        </Paper >
    );
}
