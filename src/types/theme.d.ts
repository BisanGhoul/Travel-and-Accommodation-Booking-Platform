import * as React from 'react';
import { PaletteOptions, Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        primaryButton?: Palette['primary'];
        secondaryButton?: Palette['primary'];
        slider?: Palette['primary'];
        secondaryHeader?: Palette['primary'];
        chip?: Palette['primary'];

    }
    interface PaletteOptions {
        primaryButton?: PaletteOptions['primary'];
        secondaryButton?: PaletteOptions['primary'];
        slider?: PaletteOptions['primary'];
        secondaryHeader?: PaletteOptions['primary'];
        chip?: PaletteOptions['primary'];

    }

    interface TypographyVariants {
        gridCardTitle: React.CSSProperties;
        gridCardPrice: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        gridCardTitle?: React.CSSProperties;
        gridCardPrice?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        gridCardTitle: true;
        gridCardPrice: true;
    }
}
