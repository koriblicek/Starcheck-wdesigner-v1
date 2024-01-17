import { Chip, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export interface IMaterialsFilterProps {
    items: string[];
    filteredItems: string[];
    itemAsLabel?: boolean;
    onChange: (clickedItem: string) => void;
}

export function MaterialsFilter({ items, filteredItems, itemAsLabel = true, onChange }: IMaterialsFilterProps) {

    const { t } = useTranslation();

    return (
        <Grid container wrap='wrap' maxWidth={400} columnGap={1}>
            {items.map((value) => {
                const filtered = filteredItems.includes(value);
                return <Grid item key={value}>
                    <Chip
                        variant="filled"
                        size="small"
                        label={itemAsLabel ? value : t(`label.${value}`)}
                        color={filtered ? "primary" : "default"}
                        deleteIcon={filtered ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
                        onDelete={() => onChange(value)}
                        onClick={() => onChange(value)}
                        sx={{borderRadius:1}}
                    />
                </Grid>;
            })
            }
        </Grid>
    );
}
