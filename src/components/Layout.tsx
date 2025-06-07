import type { ReactNode } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Navbar from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #fffbe7 0%, #ffe0ec 100%)' }}>
      {/* Header + Navbar */}
      <Box component="header" sx={{ width: '100%', background: 'linear-gradient(90deg, #e0f7fa 0%, #f8bbd0 100%)', py: 2, boxShadow: 2 }}>
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'nowrap' }}>
          <Typography variant="h4" fontWeight={700} color="#e91e63" sx={{ textAlign: { xs: 'center', sm: 'left' }, whiteSpace: { xs: 'normal', sm: 'nowrap' }, overflow: 'visible', textOverflow: 'clip', maxWidth: 'none' }}>
            🌸 Shop Hoa Tươi
          </Typography>
          <Box sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 0, whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', gap: 2 }}>
            <Navbar />
          </Box>
        </Container>
      </Box>
      {/* Main content */}
      <Box sx={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 4 }}>
        <Container maxWidth="md" sx={{ width: '100%' }}>
          {children}
        </Container>
      </Box>
      {/* Footer */}
      <Box component="footer" sx={{ width: '100%', background: 'linear-gradient(90deg, #f8bbd0 0%, #e0f7fa 100%)', py: 2, boxShadow: 2, mt: 4 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="#e91e63" fontWeight={600} sx={{ whiteSpace: 'normal', wordBreak: 'break-word', mb: 1 }}>
            &copy; {new Date().getFullYear()} Hoa Tươi | Thiết kế bởi bạn
          </Typography>
          <Box sx={{ color: '#e91e63', fontSize: 15 }}>
            Địa chỉ: 123 Đường Hoa, Quận 1, TP.HCM<br />
            Hotline: <a href="tel:0901234567" style={{ color: '#e91e63', textDecoration: 'underline' }}>0901 234 567</a> &nbsp;|&nbsp; Email: <a href="mailto:info@hoatuoi.vn" style={{ color: '#e91e63', textDecoration: 'underline' }}>info@hoatuoi.vn</a><br />
            Thời gian làm việc: 7:00 - 21:00 (T2 - CN)
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
