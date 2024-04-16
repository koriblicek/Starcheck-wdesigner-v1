import { Button, Divider, Grid} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { wardrobeSaveActions } from "src/store/wardrobe-data/wardrobeSaveSlice";
import { useAppSelector } from "src/store/hooks";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CarpenterIcon from '@mui/icons-material/Carpenter';

interface IToolbarSectionsSettingsProps {
    visibleText: boolean;
}

export function ToolbarSectionsSettings({ visibleText }: IToolbarSectionsSettingsProps) {

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
                    sx={{ textWrap: 'nowrap' }}
                >
                    <CarpenterIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.corpusMaterial') : ''}
                </Button>
            </Grid>
            <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.removeSection')}
                    disabled={!canRemoveSection}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.removeSection());
                    }}
                    sx={{ textWrap: 'nowrap' }}
                >
                    <RemoveCircleOutlineIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.removeSection') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.addSection')}
                    disabled={!canAddSection}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.addSection());
                    }}
                    sx={{ textWrap: 'nowrap' }}
                >
                    <AddCircleOutlineIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.addSection') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
