import { alpha, styled } from '@mui/material/styles';
import { Typography, InputBase, Toolbar } from '@mui/material';

export const StyledTitle = styled(Typography)({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
  },
});

export const StyledSearch = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  flexGrow: 1, // Allow the search container to grow and take available space
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const StyledSearchIcon = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputRoot = styled('div')({
  color: 'inherit',
});

export const StyledInputInput = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  flex: 1, // Allow the input to grow and take available space
  zIndex: 1, // Adjust the stacking order to place input above search icon
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
  // Add more padding between search icon and input
  marginLeft: theme.spacing(5),
}));

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Align the items vertically within the toolbar
});
