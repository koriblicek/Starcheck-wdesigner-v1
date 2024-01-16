import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { wardrobeAppActions } from 'src/store/wardrobe-data/wardrobeAppSlice';
import { wardrobeSaveActions } from 'src/store/wardrobe-data/wardrobeSaveSlice';
import { IWardrobeSave } from 'src/types';
import useGetAxiosFunction from 'src/hooks/useGetAxiosFunction';
import CloseIcon from '@mui/icons-material/Close';

export function NewDesignLoader() {

    const dispatch = useDispatch();

    const visibleNewDesignLoader = useAppSelector(state => state.wardrobeApp.visibleNewDesignLoader);

    const { t } = useTranslation();

    const { response, isLoading, error, axiosFetch, cancelFetch } = useGetAxiosFunction<IWardrobeSave>();

    function handleCancel() {
        cancelFetch();
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
            axiosFetch("/20240104_1e71138d-6aae-4d50-9c63-cfe0d8186a22.json");
        }
    }, [visibleNewDesignLoader, axiosFetch]);

    return (
        <Fragment>
            {isLoading &&
                <Dialog open={visibleNewDesignLoader}>
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
