import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';

export function NewDesignDialog() {

    const dispatch = useDispatch();

    const visibleNewDesignDialog = useAppSelector(state => state.wardrobeApp.visibleNewDesignDialog);

    const { t } = useTranslation();

    function handleClose() {
        dispatch(wardrobeAppActions.toggleNewDesignDialog());
    }

    function handleFetch() {
        handleClose();
        dispatch(wardrobeAppActions.toggleNewDesignLoader());
    }

    return (
        <Dialog
            open={visibleNewDesignDialog}
            keepMounted
            onClose={() => {
                handleClose();
            }}
        >
            <DialogTitle>{t('title.newDesignDialog')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('text.newDesignDialog1')}<br />
                    <i>{t('text.newDesignDialog2')}</i>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" variant="text" color='warning' onClick={handleClose} startIcon={<BlockIcon />}>
                    {t('button.cancel')}
                </Button>
                <Button size='small' variant="contained" color="primary" onClick={handleFetch} startIcon={<CheckIcon />}>
                    {t('button.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
