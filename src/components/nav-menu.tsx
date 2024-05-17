import { FilterContext } from '@/Context/filter-context';
import { InputBase, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { IconLogout, IconSearch } from '@tabler/icons-react';
import { ReactNode, useContext } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '25ch',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function NavBar({ children }: { children: ReactNode }) {
    const theme = useTheme()
    const { setFilter } = useContext(FilterContext)
    const smUp = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 10 }}>
                <AppBar position="absolute" sx={{ px: smUp ? "100px" : "1px" }}>
                    <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
                        <Typography variant="h6">
                            E-commerce
                        </Typography>
                        <Box display="flex">
                            {
                                smUp ?
                                    <Search>
                                        <SearchIconWrapper>
                                            <IconSearch />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            onChange={(e) => setFilter(e.target.value)}
                                            placeholder="O que você procura?"
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </Search>
                                    :
                                    <IconButton color="inherit">
                                        <IconSearch />
                                    </IconButton>
                            }
                            <IconButton color="inherit">
                                <IconLogout />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Toolbar />
                {children}
            </Box>
        </>
    );
}