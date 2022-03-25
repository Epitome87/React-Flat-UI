import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import paletteListStyles from '../styles/PaletteListStyles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import useDocumentTitle from '../effects/useDocumentTitle';
import { keyframes } from '@mui/system';
import styled from '@mui/material/styles/styled';
import audio from '../assets/comic_13.wav';

const squeeze = keyframes`
0% {
  transform: scale(1, 1);
} 

50% {
  transform: scale(0.9, 1);
}

70% {
  transform: scale(0.9, 0.3);
}

100% {
  transform: scale(0.9, 0.8);
}
`;

const SqueezeableTitle = styled('h1')({
  cursor: 'pointer',
  userSelect: 'none',
  transformOrigin: 'left',
  ':active': {
    animation: `${squeeze} 0.4s ease forwards`,
  },
});

const PaletteList = React.memo(({ classes, palettes, handleDelete }) => {
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    'Palettes | Flat UI Clone'
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const openDialog = (id) => {
    setDeletingId(id);
    setOpenDeleteDialog(true);
  };

  const closeDialog = () => {
    setDeletingId('');
    setOpenDeleteDialog(false);
  };

  const handleDeletePalette = () => {
    handleDelete(deletingId);
    closeDialog();
  };

  const playAudio = () => {
    new Audio(audio).play();
  };

  return (
    <div className={classes.PaletteList}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          {/* <Link to='/'> */}
          <SqueezeableTitle
            className={classes.title}
            component='h1'
            onMouseDown={playAudio}
          >
            Flat UI - React Clone
          </SqueezeableTitle>
          {/* </Link> */}
          <audio id='beep' preload='auto'>
            <source src='../../public/comic_13.wav' />
          </audio>
          <Link to='/palette/new'>Create New Palette</Link>
        </nav>

        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => {
            return (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  openDialog={openDialog}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby='delete-dialog-title'
        onClose={closeDialog}
      >
        <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDeletePalette}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Delete</ListItemText>
          </ListItem>

          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Cancel</ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
});

export default withStyles(paletteListStyles)(PaletteList);
