import { Button, DialogActions, DialogTitle, Drawer, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import { MaterialsFilter } from './MaterialsFilter';
import { useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useMaterialsFilter from 'src/hooks/useMaterialsFilter';

export function DoorsPartsMaterialDrawer() {

    const theme = useTheme();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const doorPartsMaterialSetup = useAppSelector(state => state.wardrobeSettings.doorPartsMaterialSetup);

    const selectedDoor = useAppSelector(state => state.wardrobeApp.selectedDoor);
    const selectedDoorPart = useAppSelector(state => state.wardrobeApp.selectedDoorPart);

    const doorsData = useAppSelector(state => state.wardrobeSave.save.doors.doorsData);

    const visible = useAppSelector(state => state.wardrobeApp.visibleDoorsPartsDrawer);

    const { items, filteredItems, toggleItem } = useMaterialsFilter([...new Set(Object.keys(doorPartsMaterialSetup).map((key) => doorPartsMaterialSetup[key].materialType))]);

    const fItems = useMemo(() => {
        return Object.keys(doorPartsMaterialSetup).filter((key) => filteredItems.includes(doorPartsMaterialSetup[key].materialType));
    }, [doorPartsMaterialSetup, filteredItems]);

    return (
        <Drawer
            anchor='right'
            keepMounted={false}
            open={visible}
            onClose={() => dispatch(wardrobeAppActions.toggleDoorsPartsDrawer())}
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
                        <Typography variant='h6'>{t('label.selectDoorPartMaterial')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                dispatch(wardrobeAppActions.toggleDoorsPartsDrawer());
                            }}
                            title={t('button.title')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <MaterialsFilter items={items} filteredItems={filteredItems} onChange={toggleItem} itemAsLabel={false} />
            </DialogTitle>
            <ImageList cols={3} sx={{ mt: 0, mb: 0 }}>
                {
                    fItems.map((key) => {
                        let border = '.3em transparent solid';
                        if (selectedDoor !== -1) {
                            if (selectedDoorPart !== -1) {
                                if (key === doorsData[selectedDoor].doorPartsMaterialIds[selectedDoorPart]) {
                                    border = `4px ${theme.palette.primary.dark} solid`;
                                }
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
                            onClick={() => dispatch(wardrobeSaveActions.updateDoorPartMaterialId({ doorId: selectedDoor, doorPartId: selectedDoorPart, materialId: key }))}
                        >
                            <img
                                src={`${doorPartsMaterialSetup[key].thumb}`}
                                alt={`${doorPartsMaterialSetup[key].name}`}
                            />
                            <ImageListItemBar
                                title={`${doorPartsMaterialSetup[key].name}`}
                                subtitle={t(`label.${doorPartsMaterialSetup[key].materialType}`)}
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
            <DialogActions>
                <Grid container rowGap={1} direction='column'>
                    <Grid item>
                        <Button fullWidth variant="contained" size="small"
                            onClick={() => {
                                dispatch(wardrobeSaveActions.updateSelectedDoor({ doorId: selectedDoor, doorPartId: selectedDoorPart }));
                            }}
                        >{t('button.applyMaterialToSelectedDoor')}</Button>
                    </Grid>
                    <Grid item>
                        <Button fullWidth variant="contained" size="small"
                            onClick={() => {
                                dispatch(wardrobeSaveActions.updateAllDoors({ doorData: doorsData[selectedDoor] }));
                            }}
                        >{t('button.applyDoorDesignToAll')}</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Drawer>
    );
}
