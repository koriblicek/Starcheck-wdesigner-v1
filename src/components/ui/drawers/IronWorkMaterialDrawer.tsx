import { DialogTitle, Drawer, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import CloseIcon from '@mui/icons-material/Close';

export function IronWorkMaterialDrawer() {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const ironWorkMaterialSetup = useAppSelector(state => state.wardrobeSettings.ironWorkMaterialSetup);

    const selectedMaterialId = useAppSelector(state => state.wardrobeSave.save.materials.ironWorkMaterialId);

    const visible = useAppSelector(state => state.wardrobeApp.visibleIronWorkMaterialDrawer);

    return (
        <Drawer
            anchor='right'
            keepMounted={false}
            open={visible}
            onClose={() => dispatch(wardrobeAppActions.toggleIronWorkDrawer())}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: '#ffffff01'
                    }
                }
            }}
            ModalProps={{ container: document.fullscreenElement ?? document.body }}
        >
            <DialogTitle sx={{ p: 1, pl: 2, pr: 2 }}>
                <Grid container alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h6'>{t('label.selectIronWorkMaterial')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                dispatch(wardrobeAppActions.toggleIronWorkDrawer());
                            }}
                            title={t('button.title')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <ImageList cols={3} sx={{ mt: 0, mb: 0 }}>
                {
                    Object.keys(ironWorkMaterialSetup).map((key) => {
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
                            onClick={() => dispatch(wardrobeSaveActions.updateIronWorkMaterialId({ materialId: key }))}
                        >
                            <img
                                src={`${ironWorkMaterialSetup[key].thumb}`}
                                alt={`${ironWorkMaterialSetup[key].name}`}
                            />
                            <ImageListItemBar
                                title={`${ironWorkMaterialSetup[key].name}`}
                                subtitle={t(`label.${ironWorkMaterialSetup[key].materialType}`)}
                                sx={{
                                    "& .MuiImageListItemBar-titleWrap": { p: 1 }, //styles for wrapper
                                    "& .MuiImageListItemBar-title": { fontSize: '.8rem', textOverflow: 'unset', textWrap: 'wrap', lineHeight: '130%' }, //styles for title
                                    "& .MuiImageListItemBar-subtitle": { color: "yellow", fontSize: '0.7rem' }, //styles for subtitle
                                }}
                            />
                        </ImageListItem>;
                    })
                }
            </ImageList>
        </Drawer >
    );
}
