import React, { useCallback } from 'react';

// Components
import {
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  Zoom,
  PopperPlacementType,
} from '@material-ui/core';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly menuButton: React.ReactElement;
  readonly placement?: PopperPlacementType;
  readonly wrapInMenuList?: boolean;
  readonly onOpen?: () => void;
  readonly onClose?: () => void;
  readonly disabled?: boolean;
}

const DropdownMenu: React.FC<Props> = ({
  menuButton,
  children,
  placement,
  wrapInMenuList,
  onOpen,
  onClose,
  disabled,
  classes,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    if (open) {
      onClose?.();
    } else {
      onOpen?.();
    }
    setOpen(prevOpen => !prevOpen);
  }, [onClose, onOpen, open]);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const onMenuButtonClick = disabled ? undefined : handleToggle;

  return (
    <>
      {React.cloneElement(menuButton, {
        ref: anchorRef,
        'aria-controls': open ? 'menu-list-grow' : undefined,
        'aria-haspopup': true,
        onClick: onMenuButtonClick,
      })}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement={placement}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
        }}
        className={classes.popper}
      >
        {({ TransitionProps, placement }) => (
          <Zoom
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' || 'bottom-end' || 'bottom-start'
                  ? 'center top'
                  : 'center bottom',
            }}
          >
            <Paper>
              <span className={classes.arrow} />
              <ClickAwayListener onClickAway={handleClose}>
                {wrapInMenuList ? (
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleKeyDown}
                  >
                    {children}
                  </MenuList>
                ) : (
                  <div onKeyDown={handleKeyDown}>{children}</div>
                )}
              </ClickAwayListener>
            </Paper>
          </Zoom>
        )}
      </Popper>
    </>
  );
};

DropdownMenu.defaultProps = {
  placement: 'bottom',
  wrapInMenuList: true,
};

export default withStyles(styles)(DropdownMenu);
