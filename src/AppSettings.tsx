import { IAppData, IAppInputData } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wardrobeAppDataActions } from './store/wardrobe-data/wardrobeAppDataSlice';
import useGetAxios from './hooks/useGetAxios';
import AppWardrobeSettings from './AppWardrobeSettings';

interface IAppSettingsProps {
  inputData: IAppInputData;
}

function AppSettings({ inputData }: IAppSettingsProps) {

  const dispatch = useDispatch();

  const { response, error, isLoading } = useGetAxios<IAppData>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");

  useEffect(() => {
    if (response) {
      dispatch(wardrobeAppDataActions.initializeAppData({ data: response }));
      //dispatch(wardrobeAppActions.initializeAppInputData({ appInputData: inputData }));
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
      {!isLoading && !error && response &&
        <AppWardrobeSettings appData={response} />
      }
    </Fragment>
  );
}

export default AppSettings;
