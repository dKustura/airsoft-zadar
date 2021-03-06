import * as React from 'react';
import { useCallback, ReactNode } from 'react';

// Components
import {
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  Zoom,
  PopperPlacementType,
} from '@material-ui/core';

// Helpers
import { useStyles } from './styles';

interface Props {
  readonly menuButton: React.ReactElement;
  readonly placement?: PopperPlacementType;
  readonly wrapInMenuList?: boolean;
  readonly onOpen?: () => void;
  readonly onClose?: () => void;
  readonly disabled?: boolean;
  readonly children:
    | ReactNode
    | ((setOpen: (open: boolean) => void) => ReactNode);
}

const DropdownMenu = ({
  menuButton,
  children,
  placement,
  wrapInMenuList,
  onOpen,
  onClose,
  disabled,
}: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const classes = useStyles();

  const handleToggle = useCallback(() => {
    if (open) {
      onClose?.();
    } else {
      onOpen?.();
    }
    setOpen((prevOpen) => !prevOpen);
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

  const isRenderProps = typeof children === 'function';

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
                    {isRenderProps ? (children as Function)(setOpen) : children}
                  </MenuList>
                ) : (
                  <div onKeyDown={handleKeyDown}>
                    {isRenderProps ? (children as Function)(setOpen) : children}
                  </div>
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

export default DropdownMenu;
