import { useState, useRef } from 'react';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import './Filters.css';
import { getMuiStyleOverrides } from './mui-style-overrides/filters.styles';
import { ListFilter } from '../GameCollection';

type FiltersProps = {
    onFilterChange: (filter: ListFilter) => void;
};

export const Filters: React.FC<FiltersProps> = (props) => {
    const { onFilterChange } = props;

    const [open, setOpen] = useState(false);
    const muiStyleOverrides = getMuiStyleOverrides();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const onFilterButtonClick = () => {
        setOpen(!open);
    };

    const onMenuItemClick = (e: React.MouseEvent, filter: ListFilter) => {
        e.stopPropagation();
        onFilterChange(filter);
        setOpen(false);
    }

    return (
      <div>
        <Button
            sx={muiStyleOverrides.filterButton}
            ref={anchorRef}
            onClick={onFilterButtonClick}
        >
          <>
            <FilterListIcon />
            <div className="filter-text">Filter</div>
          </>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom"
          transition
          sx={muiStyleOverrides.popper}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => { setOpen(false) }}>
                  <MenuList>
                    <MenuItem onClick={(e) => { onMenuItemClick(e, 'owned-games') }}>Owned Games</MenuItem>
                    <MenuItem onClick={(e) => { onMenuItemClick(e, 'unowned-games') }}>Unowned Games</MenuItem>
                    <MenuItem onClick={(e) => { onMenuItemClick(e, 'all-games') }}>All Mario Games</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
}