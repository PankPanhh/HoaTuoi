import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav style={{ display: 'flex', gap: 16, justifyContent: 'center', padding: 8, alignItems: 'center' }}>
      <Link to="/">Trang chủ</Link>
      <Link to="/products">Danh mục hoa</Link>
      <Link to="/cart">Giỏ hàng</Link>
      <Link to="/orders">Đơn hàng</Link>
      <Tooltip title={user ? user.name : 'Tài khoản'}>
        <IconButton onClick={handleClick} size="large" sx={{ ml: 1 }}>
          <PersonOutlineIcon sx={{ fontSize: 28, color: '#e91e63' }} />
          {user && (
            <span style={{ marginLeft: 4, fontWeight: 500, color: '#e91e63', fontSize: 16, maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'middle' }}>{user.name}</span>
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {user ? (
          [
            <MenuItem key="profile" component={Link} to="/profile">Tài khoản</MenuItem>,
            <MenuItem key="logout" onClick={logout}>Đăng xuất</MenuItem>
          ]
        ) : (
          [
            <MenuItem key="register" component={Link} to="/auth?tab=register" state={{ tab: 'register' }}>
              Đăng ký
            </MenuItem>,
            <MenuItem key="login" component={Link} to="/auth?tab=login" state={{ tab: 'login' }}>
              Đăng nhập
            </MenuItem>
          ]
        )}
      </Menu>
    </nav>
  );
}
