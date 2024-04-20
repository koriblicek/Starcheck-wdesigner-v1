import { APP_NAME, IAppInputData } from './types/index.ts';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { MaterialsProvider } from './context/MaterialsProvider.tsx';
import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import AppSettings from './AppSettings.tsx';
import './translations/i18n';
import isDev from './utils/index.ts';

//input data
let inputData: IAppInputData | undefined;

//error logs
let errorMessage = "";
// let error = false;

//curent script reference live/local
function getCurrentScript() {
  if (isDev())
    return document.getElementById("local-test");
  else
    return document.currentScript;
}

const currentScript = getCurrentScript();

if (currentScript) {
  //check for div and loading error
  const dal = "https://www.starcheck.sk/apijs/";
  const di = currentScript.getAttribute("data-id");
  const dm = currentScript.getAttribute("data-module");
  const dv = currentScript.getAttribute("data-version");
  const ddi = currentScript.getAttribute("data-design-id");
  if ((dal !== null) && (di !== null) && (dm !== null) && (dv !== null)) {

    inputData = {
      dataApiLink: dal,
      dataId: di,
      dataModule: dm,
      dataVersion: dv,
      dataDesignId: ddi ? ddi : ""
    };

    const rootElement = document.getElementById(`${dm}-root`);
    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(
        <Provider store={store}>
          <MaterialsProvider>
            {inputData &&
              <Fragment>
                <AppSettings inputData={inputData} />
              </Fragment>
            }

          </MaterialsProvider>
        </Provider>
      );
    } else {
      errorMessage = `Root node id '${APP_NAME}-root' not found!`;
      console.log(`(Starcheck-emails): ${errorMessage}`);
    }
  } else {
    errorMessage = `Some of required input data are missing! 'data-id'='${di}','data-module'='${dm}','data-version'='${dv}'`;
    console.log(`(Starcheck-wdesigner): ${errorMessage}`);
  }
}