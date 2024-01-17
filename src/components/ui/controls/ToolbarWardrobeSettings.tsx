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
    lg: boolean;
}

export function ToolbarWardrobeSettings({ lg }: IToolbarWardrobeSettingsProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="warning" variant="contained" title={t('button.newDesign')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleNewDesignDialog());
                    }}
                >
                    <CreateNewFolderIcon fontSize='small' sx={{ mr: lg ? 1 : 0 }} />{lg ? t('button.newDesign') : ''}
                </Button>
            </Grid>
            <Divider flexItem color="lightgray" orientation="vertical" sx={{ my: 0.5 }} />
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.dimensions')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleDimensionsDrawer());
                    }}
                >
                    <ArchitectureIcon fontSize='small' sx={{ mr: lg ? 1 : 0 }} />{lg ? t('button.dimensions') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.leftPartition')}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.toggleLeftPartition());
                    }}
                >
                    <AlignHorizontalLeftIcon fontSize='small' sx={{ mr: lg ? 1 : 0 }} />{lg ? t('button.leftPartition') : ''}
                </Button>
            </Grid>
            <Grid item>
                <Button size="small" color="info" variant="contained" title={t('button.rightPartition')}
                    onClick={() => {
                        dispatch(wardrobeSaveActions.toggleRightPartition());
                    }}
                >
                    {lg ? t('button.rightPartition') : ''}<AlignHorizontalRightIcon fontSize='small' sx={{ ml: lg ? 1 : 0 }} />
                </Button>
            </Grid>
        </Fragment>
    );
}
