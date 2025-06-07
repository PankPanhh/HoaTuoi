import { useLocation } from 'react-router-dom';
import RegisterForm from '../features/auth/RegisterForm';
import LoginForm from '../features/auth/LoginForm';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { useState, useEffect } from 'react';

function getTabFromLocation(location: ReturnType<typeof useLocation>) {
  const params = new URLSearchParams(location.search);
  const tab = params.get('tab');
  if (tab === 'register') return 0;
  if (tab === 'login') return 1;
  return 1; // mặc định là đăng nhập
}

export default function AuthPage() {
  const location = useLocation();
  const [tab, setTab] = useState(getTabFromLocation(location));

  useEffect(() => {
    setTab(getTabFromLocation(location));
  }, [location]);

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, p: 2, background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 2 }}>
          <Tab label="Đăng ký" />
          <Tab label="Đăng nhập" />
        </Tabs>
        {tab === 0 ? <RegisterForm /> : <LoginForm />}
      </Paper>
    </Box>
  );
}
