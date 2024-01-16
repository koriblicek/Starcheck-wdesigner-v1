import { Button, Grid,  useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';

export function ToolbarPreviewSettings() {

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

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
                    <SendIcon fontSize='small' sx={{ mr: md ? 1 : 0 }} />{md ? t('button.send') : ''}
                </Button>
            </Grid>
        </Fragment>
    );
}
