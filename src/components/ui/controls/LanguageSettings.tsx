import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppSelector } from "src/store/hooks";
import { useTranslation } from "react-i18next";
import { APP_LANGUAGES } from "src/types";
import { Fragment } from "react";
import ReactCountryFlag from "react-country-flag";

export function LanguageSettings() {

    const visibleDoors = useAppSelector(state => state.wardrobeApp.visibleDoors);

    const { t, i18n } = useTranslation();

    const appSettings: string[] = [];
    if (visibleDoors) {
        appSettings.push("doors");
    }

    function handleLanguage(_: React.MouseEvent<HTMLElement>, newLanguage: string | null) {
        if (newLanguage !== null) {
            i18n.changeLanguage(newLanguage);
        }
    }

    return (
        <Fragment>
            <Grid item>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    color="secondary"
                    value={i18n.resolvedLanguage}
                    onChange={handleLanguage}
                >
                    {APP_LANGUAGES.map((language) => {
                        return <ToggleButton size="small" value={language} key={language}
                            title={t(`languages.${language}`)}
                            sx={{ p: '0.4rem' }}
                        ><ReactCountryFlag countryCode={language} svg style={{
                            width: '1.2rem',
                            height: '1.2rem',
                        }} />
                        </ToggleButton>;
                    })
                    }
                </ToggleButtonGroup>
            </Grid>
        </Fragment>
    );
}
