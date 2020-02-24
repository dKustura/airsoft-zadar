import React, { Ref, useState, RefObject } from 'react';

// Components
import {
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  Grow,
  PopperPlacementType,
} from '@material-ui/core';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly menuButton: React.ReactElement;
  readonly placement?: PopperPlacementType;
}

const UserMenu: React.FC<Props> = ({
  menuButton,
  children,
  placement,
  classes,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const arrowRef = React.useRef<HTMLSpanElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      <>
        {React.cloneElement(menuButton, {
          ref: anchorRef,
          'aria-controls': open ? 'menu-list-grow' : undefined,
          'aria-haspopup': true,
          onClick: handleToggle,
        })}
      </>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement={placement}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
          arrow: {
            enabled: true,
            element: arrowRef.current,
          },
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' || 'bottom-end' || 'bottom-start'
                  ? 'center top'
                  : 'center bottom',
            }}
          >
            <Paper>
              <span className={classes.arrow} ref={arrowRef} />
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

UserMenu.defaultProps = {
  placement: 'bottom',
};

export default withStyles(styles)(UserMenu);
