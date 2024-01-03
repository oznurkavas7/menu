import React from "react";
import { Toolbar, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const Header = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main" sx={{ p: 1 }}>
                <Toolbar />
            </Box>
        </Box>
    )
}

export default Header;