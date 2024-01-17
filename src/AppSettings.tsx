import { IWardrobeSettings } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wardrobeSettingsActions } from './store/wardrobe-data/wardrobeSettingsSlice';
import { wardrobeSaveActions } from './store/wardrobe-data/wardrobeSaveSlice';
import useGetAxios from './hooks/useGetAxios';
import AppWardrobeData from './AppWardrobeData';

// interface IAppSettingsProps {
//   inputData: IAppInputData;
// }

function AppSettings(/*{ inputData }: IAppSettingsProps*/) {

  const dispatch = useDispatch();

  //TODO - add settings to server - ROMAN
  //const { response, error, isLoading } = useGetAxios<IWardrobeSettings>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");
  const { response, error, isLoading } = useGetAxios<IWardrobeSettings>("/settings.json");

  useEffect(() => {
    if (response) {
      dispatch(wardrobeSettingsActions.initialize({ data: response }));
      dispatch(wardrobeSaveActions.initializeSettingsSetup({ settingsSetup: response.wardrobeSetup }));
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
        <AppWardrobeData /*inputData={inputData}*/ />
      }
    </Fragment>
  );
}

export default AppSettings;
