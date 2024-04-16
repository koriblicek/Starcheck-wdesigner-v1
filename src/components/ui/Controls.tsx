import { Fragment } from "react";
import { Toolbar } from "./controls/Toolbar";
import { NewDesignDialog } from "./controls/NewDesignDialog";
import { NewDesignLoader } from "./controls/NewDesignLoader";
import { SendDesignDialog } from "./controls/SendDesignDialog";
import { Stack } from "@mui/material";

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

    return (
        <Fragment>
            <Stack direction="column" sx={toolbarSx}>
                <Toolbar />
            </Stack>
            <NewDesignDialog />
            <NewDesignLoader />
            <SendDesignDialog />
        </Fragment>
    );
}
