import { Button, DialogActions, DialogTitle, Drawer, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import CloseIcon from '@mui/icons-material/Close';

export function SectionsDrawer() {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const sectionsSetup = useAppSelector(state => state.wardrobeSettings.sectionsSetup);

    const sectionsData = useAppSelector(state => state.wardrobeSave.save.sections.sectionsData);

    const visible = useAppSelector(state => state.wardrobeApp.visibleSectionsDrawer);

    const selectedSection = useAppSelector(state => state.wardrobeApp.selectedSection);

    return (
        <Drawer
            anchor='right'
            open={visible}
            onClose={() => {
                dispatch(wardrobeAppActions.toggleSectionsDrawer());
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
                        <Typography variant='h6'>{t('label.selectSection')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                dispatch(wardrobeAppActions.toggleSectionsDrawer());
                            }}
                            title={t('button.title')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            <ImageList cols={3} sx={{ mt: 0, mb: 0 }}>
                {
                    Object.keys(sectionsSetup).map((key) => {
                        let border = '.3em transparent solid';
                        if (selectedSection !== -1) {
                            if (key === sectionsData[selectedSection]) {
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
                                dispatch(wardrobeSaveActions.updateSection({ sectionId: selectedSection, sectionReferenceId: key }));
                            }}
                        >
                            <img
                                src={`${sectionsSetup[key].thumb}`}
                                alt={`${sectionsSetup[key].name}`}
                            />
                            <ImageListItemBar
                                title={`${sectionsSetup[key].name}`}
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
                <Button fullWidth variant="contained"
                    onClick={() => {
                        dispatch(wardrobeSaveActions.updateAllSections({ sectionReferenceId: sectionsData[selectedSection] }));
                    }}
                >{t('button.applySelectedSectionToAll')}</Button>
            </DialogActions>
        </Drawer>
    );
}
