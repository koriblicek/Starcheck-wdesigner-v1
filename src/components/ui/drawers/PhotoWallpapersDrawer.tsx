import { Button, DialogActions, DialogTitle, Drawer, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import CloseIcon from '@mui/icons-material/Close';

export function PhotoWallpapersDrawer() {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const photoWallpaperMaterialSetup = useAppSelector(state => state.wardrobeSettings.photoWallpaperMaterialSetup);

    const selectedMaterialId = useAppSelector(state => state.wardrobeSave.save.materials.photoWallpaperMaterialId);

    const visible = useAppSelector(state => state.wardrobeApp.visiblePhotoWallpaperDrawer);

    const items = Object.keys(photoWallpaperMaterialSetup).map((key) => {
        let border = '.3em transparent solid';
        if (key === selectedMaterialId) {
            border = `4px ${theme.palette.primary.dark} solid`;
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
            onClick={() => dispatch(wardrobeSaveActions.updatePhotoWallpaperMaterialId({ materialId: key }))}
        >
            <img
                src={`${photoWallpaperMaterialSetup[key].thumb}`}
                alt={`${photoWallpaperMaterialSetup[key].name}`}
            />
            <ImageListItemBar
                title={`${photoWallpaperMaterialSetup[key].name}`}
                subtitle={t(`label.${photoWallpaperMaterialSetup[key].materialType}`)}
                sx={{
                    "& .MuiImageListItemBar-titleWrap": { p: 1 }, //styles for wrapper
                    "& .MuiImageListItemBar-title": { fontSize: '.8rem', textOverflow: 'unset', textWrap: 'wrap', lineHeight: '130%' }, //styles for title
                    "& .MuiImageListItemBar-subtitle": { color: "yellow", fontSize: '0.7rem' }, //styles for subtitle
                }}
            />
        </ImageListItem>;
    });

    return (
        <Drawer
            anchor='right'
            open={visible}
            onClose={() => dispatch(wardrobeAppActions.togglePhotoWallpaperDrawer())}
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
                        <Typography variant='h6'>{t('label.selectPhotoWallpaper')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                dispatch(wardrobeAppActions.togglePhotoWallpaperDrawer());
                            }}
                            title={t('button.title')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <ImageList cols={3} sx={{ mt: 0, mb: 0 }}>
                {items}
            </ImageList>
            <DialogActions>
                <Button fullWidth variant="contained"
                    onClick={() => {
                        dispatch(wardrobeSaveActions.applyPhotoWallpaperForAllDoors());
                    }}
                >{t('button.applySelectedPhotoWallpaperToAll')}</Button>
            </DialogActions>
        </Drawer>
    );
}
