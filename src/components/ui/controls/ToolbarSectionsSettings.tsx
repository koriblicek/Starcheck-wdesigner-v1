import { Button, Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { wardrobeSaveActions } from "src/store/wardrobe-data/wardrobeSaveSlice";
import { useAppSelector } from "src/store/hooks";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CarpenterIcon from '@mui/icons-material/Carpenter';

export function ToolbarSectionsSettings() {

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const canAddSection = useAppSelector(state => state.wardrobeSave.canAddSection);
    const canRemoveSection = useAppSelector(state => state.wardrobeSave.canRemoveSection);

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="primary" variant="contained" title={t('button.corpusMaterial')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleCorpusMaterialDrawer());
                    }}
                >
                    <CarpenterIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.corpusMaterial') : ''}
                </Button>
            </Grid>
            <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.removeSection')}
                    disabled={!canRemoveSection}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.removeSection());
                    }}
                >
                    <RemoveCircleOutlineIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.removeSection') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.addSection')}
                    disabled={!canAddSection}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.addSection());
                    }}
                >
                    <AddCircleOutlineIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.addSection') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
