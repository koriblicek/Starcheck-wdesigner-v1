import { Button, DialogActions, DialogTitle, Drawer, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import CloseIcon from '@mui/icons-material/Close';

export function DoorsDrawer() {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const doorsSetup = useAppSelector(state => state.wardrobeSettings.doorsSetup);

    const doorsData = useAppSelector(state => state.wardrobeSave.save.doors.doorsData);

    const visible = useAppSelector(state => state.wardrobeApp.visibleDoorsDrawer);

    const selectedDoor = useAppSelector(state => state.wardrobeApp.selectedDoor);

    return (
        <Drawer
            anchor='right'
            open={visible}
            keepMounted={false}
            onClose={() => {
                dispatch(wardrobeAppActions.toggleDoorsDrawer());
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: '#ffffff01'
                    }
                }
            }}
        >
            <DialogTitle sx={{ p: 1, pl: 2, pr: 2 }}>
                <Grid container alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h6'>{t('label.selectDoor')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                dispatch(wardrobeAppActions.toggleDoorsDrawer());
                            }}
                            title={t('button.title')}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            <ImageList cols={3} sx={{ mt: 0, mb: 0 }}>
                {
                    Object.keys(doorsSetup).map((key) => {
                        let border = '.3em transparent solid';
                        if (selectedDoor !== -1) {
                            if (key === doorsData[selectedDoor].doorTypeId) {
                                border = `4px ${theme.palette.primary.dark} solid`;
                            }
                        }
                        return <ImageListItem
                            key={key}
                            sx={[
                                {
                                    '&': {
                                        border: { border },
                                    },
                                    '&:hover': {
                                        borderColor: theme.palette.primary.light,
                                        cursor: 'pointer',
                                    }
                                }
                            ]}
                            onClick={() => {
                                dispatch(wardrobeSaveActions.updateDoor({ doorId: selectedDoor, doorTypeId: key, doorPartsNumber: doorsSetup[key].parts.length }));
                            }}
                        >
                            <img
                                src={`${doorsSetup[key].thumb}`}
                                alt={`${doorsSetup[key].name}`}
                            />
                            <ImageListItemBar
                                title={`${doorsSetup[key].name}`}
                                sx={{
                                    "& .MuiImageListItemBar-titleWrap": { p: 1 }, //styles for wrapper
                                    "& .MuiImageListItemBar-title": { fontSize: '.8rem', textOverflow: 'unset', textWrap: 'wrap', lineHeight: '130%' }, //styles for title
                                }}
                            />
                        </ImageListItem>;
                    })
                }
            </ImageList>
            <DialogActions>
                <Button fullWidth variant="contained" size="small"
                    onClick={() => {
                        dispatch(wardrobeSaveActions.updateAllDoors({ doorData: doorsData[selectedDoor] }));
                    }}
                >{t('button.applySelectedDoorToAll')}</Button>
            </DialogActions>
        </Drawer>
    );
}
