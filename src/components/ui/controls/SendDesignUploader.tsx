import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { IAppData, IAppInputData, IWardrobeSave, IWardrobeSendData } from 'src/types';
import { useMaterialsStateContext } from 'src/context/context';
import useAxiosFunction from 'src/hooks/useAxiosFunction';

interface ISendDesignUploaderProps {
    visibleSendDesignUploader: boolean;
    sendData: IWardrobeSendData;
    saveData: IWardrobeSave;
    appData: IAppData;
    appInputData: IAppInputData;
}

export function SendDesignUploader({ visibleSendDesignUploader, sendData, saveData, appData, appInputData }: ISendDesignUploaderProps) {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { isRequesting, error, response, axiosRequest } = useAxiosFunction<null, FormData>();

    const { screenshot1, screenshot2 } = useMaterialsStateContext();

    useEffect(() => {
        if (visibleSendDesignUploader) {
            const bodyFormData = new FormData();
            bodyFormData.append("screenshot1", screenshot1);
            bodyFormData.append("screenshot2", screenshot2);
            bodyFormData.append("user", JSON.stringify(sendData));
            bodyFormData.append("clientEmail", appData.emailClient);
            bodyFormData.append("dataDesignId", appInputData.dataDesignId);
            bodyFormData.append("save", JSON.stringify(saveData));
            axiosRequest(appData.sendURL, "post", bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
    }, [visibleSendDesignUploader, screenshot1, screenshot2, sendData, appData, saveData, appInputData, axiosRequest]);

    function handleClose() {
        dispatch(wardrobeAppActions.toggleSendDesignUploader());
    }

    return (
        <Fragment>
            <Dialog
                open={visibleSendDesignUploader}
                container={document.fullscreenElement ?? document.body}
            >
                <DialogTitle>{t('title.sendDesignUploader')}</DialogTitle>
                <DialogContent>
                    {isRequesting &&
                        <Fragment>
                            <Typography variant="body1">{t('text.sendDesignUploaderUploading')}</Typography>
                            <LinearProgress />
                        </Fragment>
                    }
                    {(!isRequesting && response) &&
                        <Alert severity="success">
                            {t('text.sendDesignUploaderSent')}
                        </Alert>
                    }
                    {(!isRequesting && error) &&
                        <Alert severity="error">
                            {t('text.sendDesignUploaderError')}
                        </Alert>
                    }
                </DialogContent>
                <DialogActions>
                    {(!isRequesting && (response || error)) &&
                        <Button autoFocus size="small" variant='contained' color="primary"
                            onClick={handleClose}
                        >
                            {t('button.ok')}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
