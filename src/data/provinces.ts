// Danh sách tỉnh/thành phố, quận/huyện, phường/xã mẫu cho Việt Nam (dùng cho chọn địa chỉ)
// Đơn giản hóa, chỉ lấy một số ví dụ tiêu biểu

export const provinces = [
  {
    code: '01',
    name: 'Hà Nội',
    districts: [
      {
        code: '001',
        name: 'Quận Ba Đình',
        wards: [
          { code: '00001', name: 'Phường Phúc Xá' },
          { code: '00004', name: 'Phường Trúc Bạch' },
          { code: '00006', name: 'Phường Vĩnh Phúc' },
        ],
      },
      {
        code: '002',
        name: 'Quận Hoàn Kiếm',
        wards: [
          { code: '00010', name: 'Phường Chương Dương' },
          { code: '00013', name: 'Phường Hàng Bạc' },
        ],
      },
    ],
  },
  {
    code: '79',
    name: 'TP Hồ Chí Minh',
    districts: [
      {
        code: '760',
        name: 'Quận 1',
        wards: [
          { code: '26734', name: 'Phường Bến Nghé' },
          { code: '26737', name: 'Phường Bến Thành' },
        ],
      },
      {
        code: '769',
        name: 'Quận 7',
        wards: [
          { code: '27149', name: 'Phường Tân Phong' },
          { code: '27152', name: 'Phường Tân Quy' },
        ],
      },
    ],
  },
];
