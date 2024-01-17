import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useAppSelector } from "src/store/hooks";
import { useTranslation } from "react-i18next";
import WbShadeIcon from '@mui/icons-material/WbShade';

export function QualitySettings() {

    const dispatch = useDispatch();

    const { shadows } = useAppSelector(state => state.wardrobeApp);

    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        setOptions([...(shadows ? ['shadows'] : [])]);
    }, [shadows]);

    const { t } = useTranslation();

    return (
        <Grid item>
            <ToggleButtonGroup size="small" color="secondary" value={options}>
                <ToggleButton size="small" value="shadows" title={t('button.shadows')}
                    sx={{ p: '0.4rem' }}
                    onClick={() => dispatch(wardrobeAppActions.toggleShadows())}
                ><WbShadeIcon fontSize="small" />
                </ToggleButton>;
            </ToggleButtonGroup>
        </Grid>
    );
}
