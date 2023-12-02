import React from 'react';
import {Box} from "@mui/material";
import './header.scss';

const Header = () => {
    return (
        <Box className="header">
            <Box className="header-item">Box shadow</Box>
            <Box className="header-item">Text shadow</Box>
            <Box className="header-item">Border</Box>
            <Box className="header-item">Tranform</Box>
            <Box className="header-item">Gradient</Box>
        </Box>
    );
};

export default Header;