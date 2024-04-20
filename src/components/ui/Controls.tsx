import { Fragment } from "react";
import { Toolbar } from "./controls/Toolbar";
import { NewDesignDialog } from "./controls/NewDesignDialog";
import { NewDesignLoader } from "./controls/NewDesignLoader";
import { SendDesignDialog } from "./controls/SendDesignDialog";
import { Stack } from "@mui/material";
import { useAppSelector } from "src/store/hooks";
import { SendDesignUploader } from "./controls/SendDesignUploader";

const toolbarSx = {
    p: .5,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
    overflow: 'auto',
    scrollbarWidth: 'thin'
};

export function Controls() {

    const visibleSendDesignDialog = useAppSelector(state => state.wardrobeApp.visibleSendDesignDialog);

    const visibleSendDesignUploader = useAppSelector(state => state.wardrobeApp.visibleSendDesignUploader);
    const sendData = useAppSelector(state => state.wardrobeSendData);
    const saveData = useAppSelector(state => state.wardrobeSave.save);
    const appInputData = useAppSelector(state => state.wardrobeAppInputData);
    const appData = useAppSelector(state => state.wardrobeAppData);

    return (
        <Fragment>
            <Stack direction="column" sx={toolbarSx}>
                <Toolbar />
            </Stack>
            <NewDesignDialog />
            <NewDesignLoader />
            <SendDesignDialog visibleSendDesignDialog={visibleSendDesignDialog} sendData={sendData} saveData={saveData} />
            <SendDesignUploader visibleSendDesignUploader={visibleSendDesignUploader} sendData={sendData} saveData={saveData} appData={appData} appInputData={appInputData} />
        </Fragment>
    );
}
