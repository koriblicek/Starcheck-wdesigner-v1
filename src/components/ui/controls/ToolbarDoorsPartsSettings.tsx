import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import ImageIcon from '@mui/icons-material/Image';

export function ToolbarDoorsPartsSettings() {

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useDispatch();

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="primary" variant="contained" title={t('button.changePhotoWallpaper')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.togglePhotoWallpaperDrawer());
                    }}
                >
                    <ImageIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.changePhotoWallpaper') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
