import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';

interface IToolbarPreviewSettingsProps {
    visibleText: boolean;
}

export function ToolbarPreviewSettings({ visibleText }: IToolbarPreviewSettingsProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item>
                <Button size="small" color="secondary" variant="outlined" title={t('button.send')}
                    onClick={() => {
                        dispatch(wardrobeAppActions.toggleSendDesignDialog());
                    }}
                    sx={{ textWrap: 'nowrap' }}
                >
                    <SendIcon fontSize='small' sx={{ mr: visibleText ? 1 : 0 }} />{visibleText ? t('button.send') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
