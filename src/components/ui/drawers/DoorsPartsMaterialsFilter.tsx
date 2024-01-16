import { Chip, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export interface IDoorsPartsMaterialsFilterProps {
    items: string[];
    filteredItems: string[];
    onChange: (clickedItem: string) => void;
}

export function DoorsPartsMaterialsFilter({ items, filteredItems, onChange }: IDoorsPartsMaterialsFilterProps) {

    const { t } = useTranslation();

    return (
        <Grid container wrap='wrap' maxWidth={400} columnGap={1}>
            {items.map((value) => {
                const filtered = filteredItems.includes(value);
                return <Grid item key={value}>
                    <Chip
                        variant="filled"
                        size="small"
                        label={t(`label.${value}`)}
                        color={filtered ? "primary" : "default"}
                        deleteIcon={filtered ? <ClearIcon /> : <CheckIcon />}
                        onDelete={() => onChange(value)}
                        onClick={() => onChange(value)}
                    />
                </Grid>;
            })
            }
        </Grid>
    );
}
