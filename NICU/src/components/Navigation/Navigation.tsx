import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Dashboard,
  Science,
  LocalHospital,
  Assessment,
  Feedback as FeedbackIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useColorMode } from '../../theme/ThemeProvider';
import FeedbackDialog from '../Feedback/FeedbackDialog';

const drawerWidth = 240;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Investigations', icon: <Science />, path: '/investigations' },
    { text: 'Treatments', icon: <LocalHospital />, path: '/treatments' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem button onClick={() => setFeedbackOpen(true)}>
          <ListItemIcon><FeedbackIcon /></ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              NICU Management System
            </Typography>
            <IconButton color="inherit" onClick={toggleColorMode}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {user && (
              <>
                <Tooltip title={user.username}>
                  <IconButton onClick={handleUserMenuClick} sx={{ ml: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user.username[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <FeedbackDialog 
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        context={location.pathname}
      />
    </>
  );
}