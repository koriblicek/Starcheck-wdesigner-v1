import { IAppData, IAppInputData } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wardrobeAppDataActions } from './store/wardrobe-data/wardrobeAppDataSlice';
import { wardrobeSendDataActions } from './store/wardrobe-data/wardrobeSendDataSlice';
import AppWardrobeSettings from './AppWardrobeSettings';
import useAxiosFunction from './hooks/useAxiosFunction';
import { wardrobeAppInputDataActions } from './store/wardrobe-data/wardrobeAppInputDataSlice';

interface IAppSettingsProps {
  inputData: IAppInputData;
}

function AppSettings({ inputData }: IAppSettingsProps) {

  const dispatch = useDispatch();

  const { response, error, isRequesting, axiosRequest } = useAxiosFunction<IAppData, null>();

  useEffect(() => {
    if (inputData) {
      axiosRequest(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings", "get");
    }
  }, [inputData, axiosRequest]);

  useEffect(() => {
    if (response) {
      dispatch(wardrobeAppDataActions.initializeAppData({ data: response }));
      dispatch(wardrobeAppInputDataActions.initializeAppInitData({ data: inputData }));
      dispatch(wardrobeSendDataActions.initializeSendData());
    }
  }, [response, dispatch, inputData]);

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
        <AppWardrobeSettings appData={response} />
      }
    </Fragment>
  );
}

export default AppSettings;
