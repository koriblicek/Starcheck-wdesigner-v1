import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import { IWardrobeSave } from 'src/types';
import CloseIcon from '@mui/icons-material/Close';
import useAxiosFunction from 'src/hooks/useAxiosFunction';

export function NewDesignLoader() {

    const dispatch = useDispatch();

    const visibleNewDesignLoader = useAppSelector(state => state.wardrobeApp.visibleNewDesignLoader);

    const { dataURL } = useAppSelector(state => state.wardrobeAppData);
    const { t } = useTranslation();

    const { response, isRequesting, error, axiosRequest, cancelRequest } = useAxiosFunction<IWardrobeSave, null>();

    function handleCancel() {
        cancelRequest();
        dispatch(wardrobeAppActions.toggleNewDesignLoader());
    }

    useEffect(() => {
        if (response) {
            dispatch(wardrobeSaveActions.initializeSave({ data: response }));
            dispatch(wardrobeAppActions.toggleNewDesignLoader());
        }
    }, [response, error, dispatch]);

    useEffect(() => {
        if (visibleNewDesignLoader) {
            axiosRequest(dataURL, "get");
        }
    }, [visibleNewDesignLoader, axiosRequest, dataURL]);

    return (
        <Fragment>
            {isRequesting &&
                <Dialog
                    open={visibleNewDesignLoader}
                    container={document.fullscreenElement ?? document.body}
                >
                    <DialogTitle>{t('title.newDesignLoaderLoading')}</DialogTitle>
                    <DialogContent>
                        <LinearProgress />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus size="small" variant='contained' color="warning" startIcon={<CloseIcon />}
                            onClick={handleCancel}
                        >
                            {t('button.cancel')}
                        </Button>
                    </DialogActions>
                </Dialog>
            }
            {error &&
                <Dialog open={true}>
                    <DialogTitle>{t('title.newDesignLoaderError')}</DialogTitle>
                    <DialogActions>
                        <Button autoFocus size="small" variant='contained' color="error" startIcon={<CloseIcon />}
                            onClick={handleCancel}
                        >
                            {t('button.close')}
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Fragment>
    );
}
