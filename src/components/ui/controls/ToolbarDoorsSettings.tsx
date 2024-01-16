import { Button, Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { wardrobeSaveActions } from "src/store/wardrobe-data/wardrobeSaveSlice";
import { useAppSelector } from "src/store/hooks";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HardwareIcon from '@mui/icons-material/Hardware';

export function ToolbarDoorsSettings() {

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const canAddDoor = useAppSelector(state => state.wardrobeSave.canAddDoor);
    const canRemoveDoor = useAppSelector(state => state.wardrobeSave.canRemoveDoor);

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="primary" variant="contained" title={t('button.ironworks')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleIronWorkDrawer());
                    }}
                >
                    <HardwareIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.ironworks') : ''}
                </Button>
            </Grid>
            <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.removeDoor')}
                    disabled={!canRemoveDoor}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.removeDoor());
                    }}
                >
                    <RemoveCircleOutlineIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.removeDoor') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.addDoor')}
                    disabled={!canAddDoor}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.addDoor());
                    }}
                >
                    <AddCircleOutlineIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.addDoor') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}