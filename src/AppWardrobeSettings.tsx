import { IAppData, IWardrobeSettings } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useGetAxios from './hooks/useGetAxios';
import AppWardrobeData from './AppWardrobeData';
import { wardrobeSettingsActions } from './store/wardrobe-data/wardrobeSettingsSlice';
import { wardrobeSaveActions } from './store/wardrobe-data/wardrobeSaveSlice';

interface AppWardrobeSettingsProps {
  appData: IAppData;
}

function AppWardrobeSettings({ appData }: AppWardrobeSettingsProps) {

  const dispatch = useDispatch();

  const { response, error, isLoading } = useGetAxios<IWardrobeSettings>(appData.settingsURL);

  useEffect(() => {
    if (response) {
      dispatch(wardrobeSettingsActions.initialize({ data: response }));
      dispatch(wardrobeSaveActions.initializeSettingsSetup({ settingsSetup: response.wardrobeSetup }));
    }
  }, [response, dispatch]);

  return (
    <Fragment>
      {isLoading &&
        <Grid container justifyContent='center'>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid >
      }
      {!isLoading && error &&
        <Alert variant="standard" color="error">
          <AlertTitle>{error.code}</AlertTitle>
          <Typography variant="subtitle2">{error.url}</Typography>
          <Typography variant="body1">{error.message}</Typography>
        </Alert>
      }
      {!isLoading && !error &&
        <AppWardrobeData savePath={response!.wardrobeSetup.defaultSave} />
      }
    </Fragment>
  );
}

export default AppWardrobeSettings;
