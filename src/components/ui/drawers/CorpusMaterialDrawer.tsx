import { DialogTitle, Drawer, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import { MaterialsFilter } from './MaterialsFilter';
import CloseIcon from '@mui/icons-material/Close';
import useMaterialsFilter from 'src/hooks/useMaterialsFilter';
import { useMemo } from 'react';

export function CorpusMaterialDrawer() {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const corpusMaterialSetup = useAppSelector(state => state.wardrobeSettings.corpusMaterialSetup);

    const selectedMaterialId = useAppSelector(state => state.wardrobeSave.save.materials.corpusMaterialId);

    const visible = useAppSelector(state => state.wardrobeApp.visibleCorpusMaterialDrawer);

    const { items, filteredItems, toggleItem } = useMaterialsFilter([...new Set(Object.keys(corpusMaterialSetup).map((key) => corpusMaterialSetup[key].category))]);

    const fItems = useMemo(() => {
        return Object.keys(corpusMaterialSetup).filter((key) => filteredItems.includes(corpusMaterialSetup[key].category));
    }, [corpusMaterialSetup, filteredItems]);

    return (
        <Drawer
            anchor='right'
            keepMounted={false}
            open={visible}
            onClose={() => dispatch(wardrobeAppActions.toggleCorpusMaterialDrawer())}
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
                        <Typography variant='h6'>{t('label.selectCorpusMaterial')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                dispatch(wardrobeAppActions.toggleCorpusMaterialDrawer());
                            }}
                            title={t('button.title')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <MaterialsFilter items={items} filteredItems={filteredItems} onChange={toggleItem} />
            </DialogTitle>
            <ImageList cols={3} sx={{ mt: 0, mb: 0 }}>
                {
                    //image list
                    fItems.map((key) => {
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
                            onClick={() => dispatch(wardrobeSaveActions.updateCorpusMaterialId({ materialId: key }))}
                        >
                            <img
                                src={`${corpusMaterialSetup[key].thumb}`}
                                alt={`${corpusMaterialSetup[key].name}`}
                            />
                            <ImageListItemBar
                                title={`${corpusMaterialSetup[key].name}`}
                                subtitle={t(`label.${corpusMaterialSetup[key].materialType}`)}
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
