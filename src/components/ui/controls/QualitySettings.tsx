import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useAppSelector } from "src/store/hooks";
import { useTranslation } from "react-i18next";
import WbShadeIcon from '@mui/icons-material/WbShade';

interface IQualitySettingsProps {
    visibleText: boolean;
}

export function QualitySettings({ visibleText }: IQualitySettingsProps) {

    const dispatch = useDispatch();

    const { shadows } = useAppSelector(state => state.wardrobeApp);

    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        setOptions([...(shadows ? ['shadows'] : [])]);
    }, [shadows]);

    const { t } = useTranslation();

    return (
        <ToggleButtonGroup size="small" color="info" value={options}>
            <ToggleButton size="small" value="shadows" title={t('button.shadows')}
                sx={{ p: .5, textWrap: 'nowrap' }}
                onClick={() => dispatch(wardrobeAppActions.toggleShadows())}
            >
                <WbShadeIcon fontSize="small" />
                {visibleText && <Typography sx={{ mx: 1 }}>{t(`button.shadows`)}</Typography>}
            </ToggleButton>;
        </ToggleButtonGroup>
    );
}
