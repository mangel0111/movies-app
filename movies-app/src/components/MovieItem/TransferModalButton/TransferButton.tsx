import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = { onClick: () => void };
const TransferButton: React.FC<Props> = ({ onClick }) => {
  const theme = useTheme();
  const isAbove600 = useMediaQuery(theme.breakpoints.up('sm'));

  if (isAbove600)
    return (
      <Button variant="contained" onClick={onClick} startIcon={<ShoppingCart />}>
        Transfer
      </Button>
    );

  return (
    <IconButton onClick={onClick}>
      <ShoppingCart />
    </IconButton>
  );
};

export default TransferButton;
