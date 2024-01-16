import { Fragment } from "react";
import { Toolbar } from "./controls/Toolbar";
import { NewDesignDialog } from "./controls/NewDesignDialog";
import { NewDesignLoader } from "./controls/NewDesignLoader";
import { SendDesignDialog } from "./controls/SendDesignDialog";

export function Controls() {

    return (
        <Fragment>
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <Toolbar />
            </div>
            <NewDesignDialog />
            <NewDesignLoader />
            <SendDesignDialog />
        </Fragment>
    );
}
