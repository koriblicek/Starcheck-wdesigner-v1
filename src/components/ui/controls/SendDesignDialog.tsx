import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ImageList, ImageListItem, InputAdornment, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EMaterialType } from 'src/types';
import BlockIcon from '@mui/icons-material/Block';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import SendIcon from '@mui/icons-material/Send';
import { useMaterialsStateContext } from 'src/context/context';

export function SendDesignDialog() {

    const dispatch = useDispatch();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const save = useAppSelector(state => state.wardrobeSave.save);
    const settings = useAppSelector(state => state.wardrobeSettings);

    const { screenshot1, screenshot2 } = useMaterialsStateContext();

    const visibleSendDesignDialog = useAppSelector(state => state.wardrobeApp.visibleSendDesignDialog);

    const { t } = useTranslation();

    const focusRef = useRef<HTMLInputElement | null>(null);

    const [summary, setSummary] = useState<string>();

    const getSummary = useCallback(() => {
        let s = "";
        s += `${t('label.summaryDimensions')} (${save.dimensions.width.toFixed(2)}m, ${save.dimensions.height.toFixed(2)}m, ${save.dimensions.depth.toFixed(2)}m)\r`;
        s += `${t('label.summaryLeftSidePartition')} ${save.sidePartitions.left ? t('label.summaryYes') : t('label.summaryNo')}\r`;
        s += `${t('label.summaryRightSidePartition')} ${save.sidePartitions.right ? t('label.summaryYes') : t('label.summaryNo')}\r`;
        s += `${t('label.summaryCorpusMaterial')}\r\t"${settings.corpusMaterialSetup[save.materials.corpusMaterialId].name}"\r`;
        s += `${t('label.summaryIronWorkMaterial')}\r\t"${settings.ironWorkMaterialSetup[save.materials.ironWorkMaterialId].name}"\r`;
        s += `${t('label.summaryPhotoWallpaper')}\r\t"${settings.photoWallpaperMaterialSetup[save.materials.photoWallpaperMaterialId].name}"\r`;
        s += `${t('label.summarySectionsCount')} ${save.sections.sectionsData.length}\r`;
        s += `${t('label.summarySectionWidth')} ${save.sections.sectionsWidth.toFixed(2)}m\r`;
        s += `${t('label.summarySections')}\r\t${save.sections.sectionsData.map((id, index) => { return (index + 1) + ". \"" + settings.sectionsSetup[id].name + "\""; }).join('\r\t')}\r`;
        s += `${t('label.summaryDoorsCount')} ${save.doors.doorsData.length}\r`;
        s += `${t('label.summaryDoorWidth')} ${save.doors.doorsWidth.toFixed(2)}m\r`;
        const dp = save.doors.doorsData
            .map((id, index) => {
                const dpp = id.doorPartsMaterialIds.map((pm, index) => {
                    let name = "";
                    if (settings.doorPartsMaterialSetup[pm].materialType === EMaterialType.NONE) {
                        if (settings.photoWallpaperMaterialSetup[save.materials.photoWallpaperMaterialId].materialType === EMaterialType.NONE) {
                            name = "-";
                        } else {
                            name = settings.photoWallpaperMaterialSetup[save.materials.photoWallpaperMaterialId].name;
                        }
                    } else {
                        name = settings.doorPartsMaterialSetup[pm].name;
                    }
                    return (index + 1) + ". \"" + name + "\"";
                }).join('\r\t\t');
                return (index + 1) + ". \"" + settings.doorsSetup[id.doorTypeId].name + "\":\r\t\t" + dpp;
            }).join('\r\t');

        s += `${t('label.summaryDoors')}\r\t${dp}\r`;
        return s;
    }, [save, settings, t]);

    useEffect(() => {
        if (visibleSendDesignDialog) {
            setSummary(getSummary());
            focusRef.current && focusRef.current.focus();
        }
    }, [visibleSendDesignDialog, getSummary]);

    function handleClose() {
        dispatch(wardrobeAppActions.toggleSendDesignDialog());
    }

    function handleFetch() {
        //handleClose();
        //dispatch(wardrobeAppActions.toggleNewDesignLoader());
    }

    return (
        <Dialog
            open={visibleSendDesignDialog}
            fullScreen={fullScreen}
            maxWidth='sm'
            onClose={() => {
                handleClose();
            }}
            disableRestoreFocus
        >
            <DialogTitle>{t('title.sendDesignDialog')}</DialogTitle>
            <DialogContent>
                <Grid container columnSpacing={1} rowSpacing={1}>
                    <Grid item xs={12}>
                        <TextField inputRef={focusRef} fullWidth id="input-send-nameAndSurname" label={t('label.nameAndSurname')} variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="input-send-email" label={t('label.email')} variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="input-send-phone" label={t('label.phone')} variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="input-send-assemblyPlace" label={t('label.assemblyPlace')} variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PlaceIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="input-send-comment" label={t('label.comment')} multiline rows={3} variant="filled"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={summary} fullWidth id="input-send-summary" label={t('label.summary')} multiline rows={7} variant="filled" disabled
                            inputProps={{
                                style: { fontSize: '.9rem' }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList cols={2} sx={{ mt: 0, mb: 0 }}>
                            <ImageListItem> <img src={screenshot1} /></ImageListItem>
                            <ImageListItem> <img src={screenshot2} /></ImageListItem>
                        </ImageList>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button size="small" variant="text" color='warning' onClick={handleClose} startIcon={<BlockIcon />}>
                    {t('button.cancel')}
                </Button>
                <Button size='small' variant="contained" color="primary" onClick={handleFetch} startIcon={<SendIcon />}>
                    {t('button.sendDesign')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
