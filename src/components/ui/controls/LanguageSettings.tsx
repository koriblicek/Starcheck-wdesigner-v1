import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { APP_LANGUAGES } from "src/types";
import ReactCountryFlag from "react-country-flag";

interface ILanguageSettingsProps {
    visibleText: boolean;
}

export function LanguageSettings({ visibleText }: ILanguageSettingsProps) {

    const { t, i18n } = useTranslation();

    function handleLanguage(_: React.MouseEvent<HTMLElement>, newLanguage: string | null) {
        if (newLanguage !== null) {
            i18n.changeLanguage(newLanguage);
        }
    }

    return (
        <ToggleButtonGroup
            exclusive
            size="small"
            color="info"
            value={i18n.resolvedLanguage}
            onChange={handleLanguage}
        >
            {APP_LANGUAGES.map((language) => {
                return <ToggleButton size="small" value={language} key={language}
                    title={t(`languages.${language}`)}
                    sx={{ py: .5, px: 1, textWrap: 'nowrap' }}
                ><ReactCountryFlag countryCode={language} svg style={{
                    width: '1.2rem',
                    height: '1.2rem',
                }} />
                    {visibleText && <Typography sx={{ mx: 1 }}>{t(`languages.${language}`)}</Typography>}
                </ToggleButton>;
            })
            }
        </ToggleButtonGroup>
    );
}
