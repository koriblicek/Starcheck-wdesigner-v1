import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, ImageList, ImageListItem, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { useCallback, useEffect } from 'react';
import { EMaterialType, IWardrobeSave, IWardrobeSendData } from 'src/types';
import { useMaterialsStateContext } from 'src/context/context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { wardrobeSendDataActions } from 'src/store/wardrobe-data/wardrobeSendDataSlice';
import BlockIcon from '@mui/icons-material/Block';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";

interface ISendDesignDialogProps {
    visibleSendDesignDialog: boolean;
    sendData: IWardrobeSendData;
    saveData: IWardrobeSave;
}

const schema = yup.object<IWardrobeSendData>().shape({
    nameAndSurname: yup
        .string()
        .required("validation.mixedRequired"),
    email: yup
        .string()
        .email("validation.stringEmail")
        .required("validation.mixedRequired"),
    phone: yup
        .string()
        .required("validation.mixedRequired"),
    assemblyPlace: yup
        .string()
        .required("validation.mixedRequired"),
    comment: yup
        .string()
        .nullable(),
    summary: yup
        .string()
        .nullable(),
});

export function SendDesignDialog({ visibleSendDesignDialog, sendData, saveData }: ISendDesignDialogProps) {

    const dispatch = useDispatch();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const settings = useAppSelector(state => state.wardrobeSettings);
    const { screenshot1, screenshot2 } = useMaterialsStateContext();

    const { t } = useTranslation();

    const getSummary = useCallback(() => {
        let s = "";
        s += `${t('label.summaryDimensions')} (${saveData.dimensions.width.toFixed(2)}m, ${saveData.dimensions.height.toFixed(2)}m, ${saveData.dimensions.depth.toFixed(2)}m)\r`;
        s += `${t('label.summaryLeftSidePartition')} ${saveData.sidePartitions.left ? t('label.summaryYes') : t('label.summaryNo')}\r`;
        s += `${t('label.summaryRightSidePartition')} ${saveData.sidePartitions.right ? t('label.summaryYes') : t('label.summaryNo')}\r`;
        s += `${t('label.summaryCorpusMaterial')}\r\t"${settings.corpusMaterialSetup[saveData.materials.corpusMaterialId].name}"\r`;
        s += `${t('label.summaryIronWorkMaterial')}\r\t"${settings.ironWorkMaterialSetup[saveData.materials.ironWorkMaterialId].name}"\r`;
        s += `${t('label.summaryPhotoWallpaper')}\r\t"${settings.photoWallpaperMaterialSetup[saveData.materials.photoWallpaperMaterialId].name}"\r`;
        s += `${t('label.summarySectionsCount')} ${saveData.sections.sectionsData.length}\r`;
        s += `${t('label.summarySectionWidth')} ${saveData.sections.sectionsWidth.toFixed(2)}m\r`;
        s += `${t('label.summarySections')}\r\t${saveData.sections.sectionsData.map((id, index) => { return (index + 1) + ". \"" + settings.sectionsSetup[id].name + "\""; }).join('\r\t')}\r`;
        s += `${t('label.summaryDoorsCount')} ${saveData.doors.doorsData.length}\r`;
        s += `${t('label.summaryDoorWidth')} ${saveData.doors.doorsWidth.toFixed(2)}m\r`;
        const dp = saveData.doors.doorsData
            .map((id, index) => {
                const dpp = id.doorPartsMaterialIds.map((pm, index) => {
                    let name = "";
                    if (settings.doorPartsMaterialSetup[pm].materialType === EMaterialType.NONE) {
                        if (settings.photoWallpaperMaterialSetup[saveData.materials.photoWallpaperMaterialId].materialType === EMaterialType.NONE) {
                            name = "-";
                        } else {
                            name = settings.photoWallpaperMaterialSetup[saveData.materials.photoWallpaperMaterialId].name;
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
    }, [saveData, settings, t]);

    function handleClose() {
        dispatch(wardrobeAppActions.toggleSendDesignDialog());
    }

    //validation
    const { register, handleSubmit, setFocus, getValues, setValue, formState: { errors } } = useForm<IWardrobeSendData>({
        defaultValues: sendData,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (visibleSendDesignDialog) {
            // setSummary(getSummary());
            setValue("summary", getSummary());
        }
    }, [visibleSendDesignDialog, getSummary, setValue]);

    //submit request
    const onSubmit: SubmitHandler<IWardrobeSendData> = () => {
        dispatch(wardrobeAppActions.toggleSendDesignUploader());
        handleClose();
    };

    //on form change save
    function onFormChange() {
        dispatch(wardrobeSendDataActions.updateSendData({ data: getValues() }));
    }

    //set autofocus
    useEffect(() => {
        setFocus('nameAndSurname');
    }, [setFocus]);

    return (
        <Dialog
            open={visibleSendDesignDialog}
            fullScreen={fullScreen}
            maxWidth='sm'
            onClose={() => {
                handleClose();
            }}
            disableRestoreFocus
            container={document.fullscreenElement ?? document.body}

        >
            <DialogTitle>{t('title.sendDesignDialog')}</DialogTitle>
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Grid container columnSpacing={1} rowSpacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            {...register("nameAndSurname", { onChange: () => onFormChange() })}
                            error={Boolean(errors.nameAndSurname)}
                            helperText={errors.nameAndSurname?.message && t(`${errors.nameAndSurname?.message}`)}
                            fullWidth
                            id="input-send-nameAndSurname"
                            label={t('label.nameAndSurname')}
                            variant="filled"
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
                        <TextField
                            {...register("email", { onChange: () => onFormChange() })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message && t(`${errors.email?.message}`)}
                            fullWidth
                            id="input-send-email"
                            label={t('label.email')}
                            variant="filled"
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
                        <TextField
                            {...register("phone", { onChange: () => onFormChange() })}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone?.message && t(`${errors.phone?.message}`)}
                            fullWidth
                            id="input-send-phone"
                            label={t('label.phone')}
                            variant="filled"
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
                        <TextField
                            {...register("assemblyPlace", { onChange: () => onFormChange() })}
                            error={Boolean(errors.assemblyPlace)}
                            helperText={errors.assemblyPlace?.message && t(`${errors.assemblyPlace?.message}`)}
                            fullWidth
                            id="input-send-assemblyPlace"
                            label={t('label.assemblyPlace')}
                            variant="filled"
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
                        <TextField
                            {...register("comment", { onChange: () => onFormChange() })}
                            error={Boolean(errors.comment)}
                            helperText={errors.comment?.message && t(`${errors.comment?.message}`)}
                            fullWidth
                            id="input-send-comment"
                            label={t('label.comment')}
                            multiline rows={3}
                            variant="filled"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("summary", { onChange: () => onFormChange() })}
                            fullWidth
                            id="input-send-summary"
                            label={t('label.summary')}
                            multiline
                            rows={7}
                            variant="filled"
                            disabled
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
                <Button size='small' variant="contained" color="primary" onClick={handleSubmit(onSubmit)} startIcon={<SendIcon />}>
                    {t('button.sendDesign')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
