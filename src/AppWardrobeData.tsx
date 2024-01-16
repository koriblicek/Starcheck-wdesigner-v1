import { IWardrobeSave } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { App } from './components/App';
import useGetAxios from './hooks/useGetAxios';
import { wardrobeSaveActions } from './store/wardrobe-data/wardrobeSaveSlice';

// interface IAppWardrobeDataProps {
//   inputData: IAppInputData;
// }

function AppWardrobeData(/*{ inputData }: IAppSettingsProps*/) {

  const dispatch = useDispatch();

  //TODO - add wardrobe data to server - ROMAN
  //const { response, error, isLoading } = useGetAxios<IWardrobeSettings>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");
  const { response, error, isLoading } = useGetAxios<IWardrobeSave>("/20240104_1e71138d-6aae-4d50-9c63-cfe0d8186a22.json");

  useEffect(() => {
    if (response) {
      dispatch(wardrobeSaveActions.initializeSave({ data: response }));
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
        <App />
      }
    </Fragment>
  );
}

export default AppWardrobeData;
