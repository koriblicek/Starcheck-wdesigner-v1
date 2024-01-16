import { IWardrobeSettings } from './types';
import { Alert, AlertTitle, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wardrobeSettingsActions } from './store/wardrobe-data/wardrobeSettingsSlice';
import { wardrobeSaveActions } from './store/wardrobe-data/wardrobeSaveSlice';
import useGetAxios from './hooks/useGetAxios';
import AppWardrobeData from './AppWardrobeData';
import { useMaterialsDispatchContext } from './context/context';
import { useAppSelector } from './store/hooks';

// interface IAppSettingsProps {
//   inputData: IAppInputData;
// }

function AppSettings(/*{ inputData }: IAppSettingsProps*/) {

  const dispatch = useDispatch();

  const ctx = useMaterialsDispatchContext();

  //TODO - add settings to server - ROMAN
  //const { response, error, isLoading } = useGetAxios<IWardrobeSettings>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");
  const { response, error, isLoading } = useGetAxios<IWardrobeSettings>("/settings.json");

  const { roomWallColor, roomBottomWallColor } = useAppSelector(state => state.wardrobeApp);

  useEffect(() => {
    if (response) {
      dispatch(wardrobeSettingsActions.initialize({ data: response }));
      dispatch(wardrobeSaveActions.initializeSettingsSetup({ settingsSetup: response.wardrobeSetup }));
      ctx({ type: "CHANGE_ROOMWALL_COLOR", color: roomWallColor });
      ctx({ type: "CHANGE_ROOMBOTTOMWALL_COLOR", color: roomBottomWallColor });
    }
  }, [response, dispatch, ctx, roomBottomWallColor, roomWallColor]);

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
