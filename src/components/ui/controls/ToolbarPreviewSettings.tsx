import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';

interface IToolbarPreviewSettingsProps {
    lg: boolean;
}

export function ToolbarPreviewSettings({ lg }: IToolbarPreviewSettingsProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="warning" variant="contained" title={t('button.send')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleSendDesignDialog());
                    }}
                >
                    <SendIcon fontSize='small' sx={{ mr: lg ? 1 : 0 }} />{lg ? t('button.send') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
