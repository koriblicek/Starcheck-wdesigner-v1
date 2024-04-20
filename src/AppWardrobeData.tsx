import { IWardrobeSave } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { App } from './components/App';
import { useAppSelector } from './store/hooks';
import { wardrobeSaveActions } from './store/wardrobe-data/wardrobeSaveSlice';
import useAxiosFunction from './hooks/useAxiosFunction';

interface IAppWardrobeDataProps {
  savePath: string;
}

function AppWardrobeData({ savePath }: IAppWardrobeDataProps) {
  
  const dispatch = useDispatch();

  const { response, error, isRequesting, axiosRequest } = useAxiosFunction<IWardrobeSave, null>();

  const initialized = useAppSelector(state => state.wardrobeSave.initialized);


  useEffect(() => {
    if (savePath) {
      axiosRequest(savePath, "get");
    }
  }, [savePath, axiosRequest]);

  useEffect(() => {
    if (response) {
      dispatch(wardrobeSaveActions.initializeSave({ data: response }));
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
      {!isRequesting && !error && initialized &&
        <App />
      }
    </Fragment>
  );
}

export default AppWardrobeData;
