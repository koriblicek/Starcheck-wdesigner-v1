import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import ImageIcon from '@mui/icons-material/Image';

interface IToolbarDoorsPartsSettingsProps {
    lg: boolean;
}

export function ToolbarDoorsPartsSettings({ lg }: IToolbarDoorsPartsSettingsProps) {

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
                    <ImageIcon fontSize='small' sx={{ mr: lg ? 1 : 0 }} />{lg ? t('button.changePhotoWallpaper') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
