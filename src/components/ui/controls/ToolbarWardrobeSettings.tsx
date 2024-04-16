import { Button, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { wardrobeSaveActions } from "src/store/wardrobe-data/wardrobeSaveSlice";
import ArchitectureIcon from '@mui/icons-material/Architecture';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';

interface IToolbarWardrobeSettingsProps {
    visibleText: boolean;
}

export function ToolbarWardrobeSettings({ visibleText }: IToolbarWardrobeSettingsProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="warning" variant="contained" title={t('button.newDesign')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleNewDesignDialog());
                    }}
                    sx={{ textWrap: 'nowrap' }}
                >
                    <CreateNewFolderIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.newDesign') : ''}
                </Button>
            </Grid>
            <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.dimensions')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleDimensionsDrawer());
                    }}
                    sx={{ textWrap: 'nowrap' }}
                >
                    <ArchitectureIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.dimensions') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.leftPartition')}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.toggleLeftPartition());
                    }}
                    sx={{ textWrap: 'nowrap' }}
                >
                    <AlignHorizontalLeftIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.leftPartition') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.rightPartition')}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.toggleRightPartition());
                    }}
                >
                    {visibleText ? t('button.rightPartition') : ''}<AlignHorizontalRightIcon fontSize='small' sx={{ ml: visibleText ? 1 : 0 }} />
                </Button>
            </Grid>
        </Fragment>
    );
}
