import { DialogContent, DialogTitle, Drawer, Grid, IconButton, Slider, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/store/hooks";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import { wardrobeSaveActions } from "src/store/wardrobe-data/wardrobeSaveSlice";

const step = 0.01;

export function DimensionsDrawer() {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const visible = useAppSelector(state => state.wardrobeApp.visibleDimensionsDrawer);

    const wardrobeSetup = useAppSelector(state => state.wardrobeSettings.wardrobeSetup);

    const dimensions = useAppSelector((state) => state.wardrobeSave.save.dimensions);

    /*
    const debouncedWidthUpdate = debounce((value) => {
        dispatch(wardrobeSaveActions.updateWidth({ w: value as number }));
    }, 50);

    const debouncedHeightUpdate = debounce((value) => {
        dispatch(wardrobeSaveActions.updateHeight({ h: value as number }));
    }, 50);

    const debouncedDepthUpdate = debounce((value) => {
        dispatch(wardrobeSaveActions.updateDepth({ d: value as number }));
    }, 50);
    */

    function valueText(value: number) {
        return `${value.toFixed(2)}m`;
    }

    return (
        <Drawer
            anchor='bottom'
            open={visible}
            keepMounted={false}
            onClose={() => dispatch(wardrobeAppActions.toggleDimensionsDrawer())}
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
                        <Typography variant='h6'>{t('label.setDimensions')}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton sx={{ ml: 'auto' }} onClick={() => dispatch(wardrobeAppActions.toggleDimensionsDrawer())} title={t('button.title')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <Typography gutterBottom sx={{ mt: 1, ml: 1 }}>{t('label.wardrobeWidth')}:</Typography>
                <Stack spacing={2} direction="row" sx={{ ml: 2, mr: 2, mb: 3 }} alignItems="center">
                    <WestIcon fontSize="medium" color='action' />
                    <Slider
                        min={wardrobeSetup.width.min}
                        max={wardrobeSetup.width.max}
                        value={dimensions.width}
                        valueLabelDisplay="on"
                        valueLabelFormat={valueText}
                        step={step}
                        marks={[{ value: wardrobeSetup.width.min, label: wardrobeSetup.width.min.toFixed(2) + "m" }, { value: wardrobeSetup.width.max, label: wardrobeSetup.width.max.toFixed(2) + "m" }]}
                        onChange={(_, value) => dispatch(wardrobeSaveActions.updateWidth({ w: value as number }))}
                    />
                    <EastIcon fontSize="medium" color='action' />
                </Stack>
                <Typography gutterBottom sx={{ ml: 1 }}>{t('label.wardrobeHeight')}:</Typography>
                <Stack spacing={2} direction="row" sx={{ ml: 2, mr: 2, mb: 3 }} alignItems="center">
                    <SouthIcon fontSize='medium' color='action' />
                    <Slider
                        min={wardrobeSetup.height.min}
                        max={wardrobeSetup.height.max}
                        value={dimensions.height}
                        valueLabelDisplay="on"
                        valueLabelFormat={valueText}
                        step={step}
                        marks={[{ value: wardrobeSetup.height.min, label: wardrobeSetup.height.min.toFixed(2) + "m" }, { value: wardrobeSetup.height.max, label: wardrobeSetup.height.max.toFixed(2) + "m" }]}
                        onChange={(_, value) => dispatch(wardrobeSaveActions.updateHeight({ h: value as number }))}
                    />
                    <NorthIcon fontSize='medium' color='action' />
                </Stack>
                <Typography gutterBottom sx={{ ml: 1 }}>{t('label.wardrobeDepth')}:</Typography>
                <Stack spacing={2} direction="row" sx={{ ml: 2, mr: 2, mb: 3 }} alignItems="center">
                    <SouthWestIcon fontSize='medium' color='action' />
                    <Slider
                        min={wardrobeSetup.depth.min}
                        max={wardrobeSetup.depth.max}
                        value={dimensions.depth}
                        valueLabelDisplay="on"
                        valueLabelFormat={valueText}
                        step={step}
                        marks={[{ value: wardrobeSetup.depth.min, label: wardrobeSetup.depth.min.toFixed(2) + "m" }, { value: wardrobeSetup.depth.max, label: wardrobeSetup.depth.max.toFixed(2) + "m" }]}
                        onChange={(_, value) => dispatch(wardrobeSaveActions.updateDepth({ d: value as number }))}
                    />
                    <NorthEastIcon fontSize='medium' color='action' />
                </Stack>
            </DialogContent>
        </Drawer>
    );
}
