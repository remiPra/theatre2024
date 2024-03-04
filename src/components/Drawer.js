import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { CiMenuBurger } from 'react-icons/ci';
import { Link } from 'react-router-dom';

export default function DrawerBasic() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
      <CiMenuBurger size={44} className='rounded-xl font-normal p-3 flex hover:bg-red-100  cursor-pointer' />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
      <div className='m-2'  >
            <p className='rubik mt-7 text-[30px] text-center'>Apprendre la pièce de théatre </p>
            <p className='text-2xl w-[250px] rounded-2xl font-bold p-2 mt-9 mb-12 text-white bg-blue-800 mx-auto text-center'>What do you want ?
            </p>
            <ul>
                {/* <li><Link className='px-2' to="/">Accueil</Link></li> */}
                <li onClick={toggleDrawer(false)}><Link  className='font-bold p-2 m-3 rounded-2xl text-center bg-red-100 mx-auto w-[250px] block' to="/allsentences">Je veux voir toutes mes répliques dans la pièce  </Link></li>
                <li onClick={toggleDrawer(false)}><Link className='p-2 m-3 font-bold rounded-2xl text-center bg-red-100 mx-auto w-[250px] block' to="/audio">Je veux travailler une scene en cachant mon texte </Link></li>
            </ul>
        </div>
      </Drawer>
    </Box>
  );
}