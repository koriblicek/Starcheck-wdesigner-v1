import { IAppData, IWardrobeSettings } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wardrobeSettingsActions } from './store/wardrobe-data/wardrobeSettingsSlice';
import { wardrobeSaveActions } from './store/wardrobe-data/wardrobeSaveSlice';
import { useAppSelector } from './store/hooks';
import AppWardrobeData from './AppWardrobeData';
import useAxiosFunction from './hooks/useAxiosFunction';

interface AppWardrobeSettingsProps {
  appData: IAppData;
}

function AppWardrobeSettings({ appData }: AppWardrobeSettingsProps) {

  const dispatch = useDispatch();

  const appInputData = useAppSelector(state => state.wardrobeAppInputData);
  const { response, error, isRequesting, axiosRequest } = useAxiosFunction<IWardrobeSettings, null>();

  useEffect(() => {
    if (appData) {
      axiosRequest(appData.settingsURL, "get");
    }
  }, [appData, axiosRequest]);

  useEffect(() => {
    if (response) {
      dispatch(wardrobeSettingsActions.initialize({ data: response }));
      dispatch(wardrobeSaveActions.initializeSettingsSetup({ settingsSetup: response.wardrobeSetup }));
    }
  }, [response, dispatch]);

  return (
    <Fragment>
      {isRequesting &&
        <Grid container justifyContent='center'>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid >
      }
      {!isRequesting && error &&
        <Alert variant="standard" color="error">
          <AlertTitle>{error.code}</AlertTitle>
          <Typography variant="subtitle2">{error.url}</Typography>
          <Typography variant="body1">{error.message}</Typography>
        </Alert>
      }
      {!isRequesting && !error && response &&
        <AppWardrobeData
          savePath={(appInputData.dataDesignId !== "") ? appData.dataURL + "?" + appInputData.dataDesignId : response.wardrobeSetup.defaultSave}
        />
      }
    </Fragment>
  );
}

export default AppWardrobeSettings;
