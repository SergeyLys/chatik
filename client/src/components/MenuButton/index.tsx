import React, {ReactNode} from 'react';
import {flow} from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface OwnProps {
    children: ReactNode;
    menuItems: {
        title: string;
        handler: (args?: any) => void;
    }[]
}

type Props = OwnProps;

const ITEM_HEIGHT = 48;

const MenuButton = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                {props.children}
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {props.menuItems.map(item => (
                    <MenuItem key={item.title} onClick={flow(handleClose, item.handler)}>
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MenuButton;