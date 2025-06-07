import type { Product } from '../types';

export const allProducts: (Product & { images: string[] })[] = [
  // --- Dịp: Tình yêu (Bao gồm Lễ tình nhân, Valentine) ---
  {
    id: '1',
    name: 'Bó Hoa Hồng Đỏ Lãng Mạn',
    description: 'Biểu tượng của tình yêu nồng cháy và sự lãng mạn bất tận, món quà ý nghĩa cho mọi khoảnh khắc yêu thương.',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Đỏ',
    type: 'Hoa bó',
    occasion: 'Tình yêu',
    bestSeller: true,
    promotion: 15, // Giảm giá 15% (trước đây 20%)
  },
  {
    id: '5',
    name: 'Bó Hoa Hồng Trắng Tinh Khôi',
    description: 'Mang ý nghĩa tình yêu thuần khiết, trong sáng và khởi đầu mới, thích hợp để bày tỏ sự trân trọng.',
    price: 360000,
    image: 'https://images.unsplash.com/photo-AutreFormat&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Valentine',
  },
  {
    id: '6',
    name: 'Bó Hoa Tulip Đỏ Ngọt Ngào',
    description: 'Lời tỏ tình ngọt ngào và cháy bỏng, thể hiện tình cảm sâu sắc và bền lâu, rất được yêu thích trong các dịp đặc biệt.',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tulip',
    color: 'Đỏ',
    type: 'Hoa bó',
    occasion: 'Valentine',
  },
  {
    id: '11',
    name: 'Bó Hoa Tulip Hồng Lãng Mạn',
    description: 'Biểu tượng của tình yêu nhẹ nhàng, lãng mạn và sự quan tâm tinh tế, phù hợp cho những mối quan hệ mới chớm nở.',
    price: 410000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tulip',
    color: 'Hồng',
    type: 'Hoa bó',
    occasion: 'Lễ tình nhân',
  },
  {
    id: '12',
    name: 'Hộp Hoa Hồng Xanh Độc Đáo',
    description: 'Tình yêu bí ẩn, độc đáo và sự ngưỡng mộ, món quà thể hiện sự khác biệt và cá tính riêng.',
    price: 530000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Xanh',
    type: 'Hộp hoa',
    occasion: 'Lễ tình nhân',
    promotion: 10, // Giảm giá 10% (trước đây 20%) vì giá cao
  },
  {
    id: '19',
    name: 'Bó Hoa Tulip Hồng & Trắng Dịu Dàng',
    description: 'Sự kết hợp hài hòa giữa tình yêu dịu dàng và vẻ đẹp trong sáng, thích hợp để tặng người yêu thương.',
    price: 430000,
    image: 'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tulip',
    color: 'Hồng',
    type: 'Hoa bó',
    occasion: 'Valentine',
    promotion: 25, // Giảm giá 25% (trước đây 20%) vì giá tầm trung
  },
  {
    id: '20',
    name: 'Hộp Hoa Hồng Đỏ & Baby Tinh Khôi',
    description: 'Sự kết hợp hoàn hảo của tình yêu nồng nàn (Hồng Đỏ) và sự tinh khôi (Baby), mang đến vẻ đẹp lãng mạn và ngọt ngào.',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1510467776478-f75f3a7f8b9e?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1510467776478-f75f3a7f8b9e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Đỏ',
    type: 'Hộp hoa',
    occasion: 'Lễ tình nhân',
  },
  {
    id: '21',
    name: 'Bó Hoa Lily Trắng Tình Yêu Vĩnh Cửu',
    description: 'Hương thơm nồng nàn và vẻ đẹp thanh cao, tượng trưng cho tình yêu vĩnh cửu và sự chung thủy.',
    price: 390000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lily',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Tình yêu',
    promotion: 30, // Giảm giá 30% (trước đây 20%) vì giá thấp hơn
  },
  {
    id: '29',
    name: 'Bó Hoa Lưu Ly Chung Thủy',
    description: 'Biểu tượng của tình yêu bất diệt và lòng chung thủy, mang đến thông điệp sâu sắc về sự gắn kết.',
    price: 260000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Xanh',
    type: 'Hoa bó',
    occasion: 'Tình yêu',
    promotion: 20, // Giảm giá 20% (giữ nguyên) vì giá thấp
  },
  {
    id: '30',
    name: 'Bó Hoa Mao Lương Đỏ Quyến Rũ',
    description: 'Vẻ đẹp lộng lẫy và quyến rũ, thể hiện sự hấp dẫn và đam mê, món quà độc đáo cho tình yêu.',
    price: 340000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Đỏ',
    type: 'Hoa bó',
    occasion: 'Valentine',
  },
  // --- Dịp: Sinh nhật ---
  {
    id: '2',
    name: 'Bó Hoa Cẩm Chướng Ngọt Ngào',
    description: 'Sự ngọt ngào, tinh tế và lòng biết ơn, món quà ý nghĩa để chúc mừng sinh nhật người thân và bạn bè.',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cẩm chướng',
    color: 'Hồng',
    type: 'Hoa bó',
    occasion: 'Sinh nhật',
    bestSeller: true,
    promotion: 25, // Giảm giá 25% (trước đây 20%) vì là best-seller
  },
  {
    id: '7',
    name: 'Giỏ Hoa Đồng Tiền May Mắn',
    description: 'Mang đến lời chúc mừng sinh nhật vui vẻ, may mắn và thịnh vượng, rực rỡ sắc màu tươi tắn.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Đồng tiền',
    color: 'Vàng',
    type: 'Hoa giỏ',
    occasion: 'Sinh nhật',
  },
  {
    id: '8',
    name: 'Chậu Hoa Lan Vàng Sang Trọng',
    description: 'Vẻ đẹp sang trọng, tươi mới và đẳng cấp, là món quà sinh nhật ý nghĩa cho người trân quý.',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lan',
    color: 'Vàng',
    type: 'Hoa chậu',
    occasion: 'Sinh nhật',
  },
  {
    id: '13',
    name: 'Bó Hoa Cẩm Tú Cầu Xanh Chân Thành',
    description: 'Lời chúc chân thành, tình cảm sâu sắc và sự thấu hiểu, mang đến niềm vui trong ngày sinh nhật.',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1587393433986-e4d0c1e8d1b1?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1587393433986-e4d0c1e8d1b1?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1599557434199-31e34b9d5c41?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cẩm tú cầu',
    color: 'Xanh',
    type: 'Hoa bó',
    occasion: 'Sinh nhật',
    promotion: 20, // Giảm giá 20% (giữ nguyên) vì giá tầm trung
  },
  {
    id: '15',
    name: 'Giỏ Hoa Baby Trắng Trong Sáng',
    description: 'Sự thuần khiết, trong sáng và ngây thơ, thích hợp làm quà sinh nhật cho bạn bè và những người yêu thích sự nhẹ nhàng.',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1614275069277-3e1e8b2b7a0f?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1614275069277-3e1e8b2b7a0f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1620202068940-a19f20c4c4e7?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Baby',
    color: 'Trắng',
    type: 'Hoa giỏ',
    occasion: 'Sinh nhật',
    promotion: 30, // Giảm giá 30% (trước đây 20%) vì giá thấp
  },
  // --- Dịp: Khai trương ---
  {
    id: '3',
    name: 'Giỏ Hoa Hướng Dương Niềm Tin',
    description: 'Đại diện cho niềm tin, hy vọng và sự khởi đầu rực rỡ, mang đến lời chúc thành công và phát đạt.',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hướng dương',
    color: 'Vàng',
    type: 'Hoa giỏ',
    occasion: 'Khai trương',
    bestSeller: true,
    promotion: 15, // Giảm giá 15% (trước đây 20%) vì là best-seller
  },
  {
    id: '9',
    name: 'Kệ Hoa Cát Tường Phát Lộc',
    description: 'Chúc khai trương phát tài phát lộc, mang đến sự may mắn và thịnh vượng cho khởi đầu kinh doanh mới.',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cát Tường',
    color: 'Tím',
    type: 'Hoa kệ',
    occasion: 'Khai trương',
  },
  {
    id: '10',
    name: 'Kệ Hoa Lan Hồ Điệp Vàng Thịnh Vượng',
    description: 'Biểu tượng của sự thịnh vượng, may mắn và thành công rực rỡ cho ngày khai trương, thể hiện sự đẳng cấp.',
    price: 600000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lan',
    color: 'Vàng',
    type: 'Hoa kệ',
    occasion: 'Khai trương',
    promotion: 10, // Giảm giá 10% (trước đây 20%) vì giá cao
  },
  // Các sản phẩm còn lại giữ nguyên, chỉ liệt kê một số để minh họa
  {
    id: '16',
    name: 'Kệ Hoa Lan Hồ Điệp Trắng Cao Cấp',
    description: 'Biểu tượng của sự sang trọng, thịnh vượng và phát đạt, thích hợp cho các buổi lễ khai trương trọng đại.',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1597818788434-5f5f4f89f2d6?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1597818788434-5f5f4f89f2d6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1597818788434-5f5f4f89f2d6?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lan',
    color: 'Trắng',
    type: 'Hoa kệ',
    occasion: 'Khai trương',
  },
  {
    id: '17',
    name: 'Giỏ Hoa Đồng Tiền Đỏ Tài Lộc',
    description: 'Mang tài lộc, may mắn và sự phát đạt đến dịp khai trương, với sắc đỏ tươi tắn tượng trưng cho sự thành công.',
    price: 360000,
    image: 'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Đồng tiền',
    color: 'Đỏ',
    type: 'Hoa giỏ',
    occasion: 'Khai trương',
    promotion: 25, // Giảm giá 25% (trước đây 20%) vì giá tầm trung
  },
  // --- Dịp: Tốt nghiệp ---
  {
    id: '22',
    name: 'Bó Hoa Hướng Dương Kỷ Niệm Thành Công',
    description: 'Chúc mừng thành công, một khởi đầu mới rực rỡ và tràn đầy hy vọng cho tương lai, món quà ý nghĩa cho lễ tốt nghiệp.',
    price: 330000,
    image: 'https://images.unsplash.com/photo-1598418585474-061a7a016f46?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1598418585474-061a7a016f46?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hướng dương',
    color: 'Vàng',
    type: 'Hoa bó',
    occasion: 'Tốt nghiệp',
    bestSeller: true,
    promotion: 15, // Giảm giá 15% (trước đây 20%) vì là best-seller
  },
  {
    id: '24',
    name: 'Giỏ Hoa Cúc Đại Đóa Tôn Vinh',
    description: 'Tôn vinh sự cố gắng, kiên trì và thành công, là món quà động viên ý nghĩa cho chặng đường mới.',
    price: 310000,
    image: 'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cúc',
    color: 'Vàng',
    type: 'Hoa giỏ',
    occasion: 'Tốt nghiệp',
    promotion: 20, // Giảm giá 20% (giữ nguyên) vì giá tầm trung
  },
  // --- Dịp: Giáng Sinh ---
  {
    id: '27',
    name: 'Giỏ Hoa Cúc Mini Đỏ & Xanh Giáng Sinh',
    description: 'Tạo điểm nhấn màu sắc tươi vui cho mùa lễ hội, mang đến không khí ấm cúng và rực rỡ.',
    price: 270000,
    image: 'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cúc',
    color: 'Đỏ',
    type: 'Hoa giỏ',
    occasion: 'Giáng Sinh',
    promotion: 30, // Giảm giá 30% (trước đây 20%) vì giá thấp
  },
  // --- Dịp: Hoa cưới ---
  {
    id: '32',
    name: 'Bó Hoa Lily Trắng Cô Dâu',
    description: 'Vẻ đẹp thanh lịch, sang trọng và tinh khiết, là lựa chọn cổ điển cho bó hoa cô dâu.',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lily',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Hoa cưới',
    promotion: 10, // Giảm giá 10% (trước đây 20%) vì giá cao
  },
  // Các sản phẩm mới được thêm vào (từ id '34' trở đi) sẽ chọn một số để có đủ 10 sản phẩm giảm giá
  {
    id: '34',
    name: 'Hộp Hoa Hồng Phấn Dịu Dàng',
    description: 'Vẻ đẹp tinh tế, lãng mạn, gửi gắm tình yêu nhẹ nhàng và sự ngưỡng mộ sâu sắc.',
    price: 480000,
    image: 'https://images.unsplash.com/photo-1557088194-d2e1d7d0d0c3?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1557088194-d2e1d7d0d0c3?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Hồng',
    type: 'Hộp hoa',
    occasion: 'Lễ tình nhân',
    bestSeller: true,
    promotion: 15, // Giảm giá 15% (trước đây 20%) vì là best-seller
  },
  {
    id: '39',
    name: 'Bó Hoa Baby Hồng Ngây Thơ',
    description: 'Biểu tượng của tình yêu trong sáng, sự tinh khiết và vẻ đẹp dịu dàng, thích hợp cho những người yêu thích sự nhẹ nhàng.',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1614275069277-3e1e8b2b7a0f?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1614275069277-3e1e8b2b7a0f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1620202068940-a19f20c4c4e7?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Baby',
    color: 'Hồng',
    type: 'Hoa bó',
    occasion: 'Tình yêu',
    promotion: 25, // Giảm giá 25% (trước đây 20%) vì giá tầm trung
  },
  {
    id: '40',
    name: 'Hộp Hoa Đồng Tiền Vàng Rực Rỡ',
    description: 'Mang đến niềm vui, sự may mắn và tài lộc, món quà ý nghĩa cho dịp khai trương hoặc chúc mừng thành công.',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Đồng tiền',
    color: 'Vàng',
    type: 'Hộp hoa',
    occasion: 'Khai trương',
  },
  {
    id: '41',
    name: 'Bó Hoa Cẩm Tú Cầu Tím Mộng Mơ',
    description: 'Thể hiện sự chân thành, lãng mạn và tình cảm sâu sắc, một lựa chọn tuyệt vời để bày tỏ lòng mình.',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1587393433986-e4d0c1e8d1b1?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1587393433986-e4d0c1e8d1b1?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1599557434199-31e34b9d5c41?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cẩm tú cầu',
    color: 'Tím',
    type: 'Hoa bó',
    occasion: 'Tình yêu',
  },
  {
    id: '42',
    name: 'Chậu Hoa Cúc Mẫu Đơn Đỏ Rực',
    description: 'Sự kiên cường, trường tồn và vẻ đẹp vĩnh cửu, món quà ý nghĩa cho người thân yêu.',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cúc',
    color: 'Đỏ',
    type: 'Hoa chậu',
    occasion: 'Sinh nhật',
  },
  {
    id: '43',
    name: 'Kệ Hoa Trạng Nguyên Đỏ & Vàng May Mắn',
    description: 'Kết hợp sắc đỏ truyền thống và vàng tài lộc, mang đến sự ấm áp và may mắn cho dịp khai trương.',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Trạng Nguyên',
    color: 'Đỏ',
    type: 'Hoa kệ',
    occasion: 'Khai trương',
  },
  {
    id: '44',
    name: 'Bó Hoa Tulip Vàng Tươi Vui',
    description: 'Biểu tượng của sự vui vẻ, năng lượng tích cực và hạnh phúc, thích hợp để cổ vũ hoặc chúc mừng.',
    price: 390000,
    image: 'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80', // Placeholder for yellow tulip
    images: [
      'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tulip',
    color: 'Vàng',
    type: 'Hoa bó',
    occasion: 'Sinh nhật',
  },
  {
    id: '45',
    name: 'Giỏ Hoa Hồng Mix Màu Nổi Bật',
    description: 'Sự pha trộn của nhiều sắc thái tình yêu và cảm xúc, mang đến vẻ đẹp đa dạng và ấn tượng.',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Placeholder for mixed roses
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Tất cả', // Mixed colors
    type: 'Hoa giỏ',
    occasion: 'Tình yêu',
    bestSeller: true,
  },
  {
    id: '46',
    name: 'Hộp Hoa Lily & Tulip Thanh Lịch',
    description: 'Sự kết hợp tinh tế của vẻ đẹp thanh cao (Lily) và nét duyên dáng (Tulip), tạo nên món quà sang trọng.',
    price: 580000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', // Placeholder for mixed
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lily',
    color: 'Trắng', // Assuming main color is white/light
    type: 'Hộp hoa',
    occasion: 'Lễ tình nhân',
  },
  {
    id: '47',
    name: 'Bó Hoa Cúc Họa Mi Tinh Khôi',
    description: 'Sự đơn giản, thuần khiết và vẻ đẹp mộc mạc, mang đến cảm giác bình yên và tươi mới.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80', // Placeholder for daisy
    images: [
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517721868356-8208a0d4c81a?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cúc',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Tốt nghiệp',
    promotion: 20, // Promotion: 20% off
  },
  {
    id: '48',
    name: 'Chậu Hoa Lan Hồ Điệp Mini Xanh Biển',
    description: 'Vẻ đẹp độc đáo, sang trọng và thu hút, mang đến sự thư thái và mới lạ cho không gian.',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1620202068940-a19f20c4c4e7?auto=format&fit=crop&w=400&q=80', // Placeholder for blue orchid
    images: [
      'https://images.unsplash.com/photo-1620202068940-a19f20c4c4e7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1597818788434-5f5f4f89f2d6?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lan',
    color: 'Xanh',
    type: 'Hoa chậu',
    occasion: 'Sinh nhật',
  },
  {
    id: '49',
    name: 'Bó Hoa Cát Tường Trắng Thuần Khiết',
    description: 'Tượng trưng cho may mắn, tình yêu thuần khiết và hạnh phúc, phù hợp cho nhiều dịp đặc biệt.',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Placeholder for white lisianthus
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cát Tường',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Hoa cưới',
  },
  {
    id: '50',
    name: 'Giỏ Hoa Hướng Dương & Đồng Tiền Phát Tài',
    description: 'Sự kết hợp của may mắn, niềm tin và tài lộc, mang đến lời chúc thành công rực rỡ.',
    price: 370000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', // Placeholder for mixed basket
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hướng dương',
    color: 'Vàng',
    type: 'Hoa giỏ',
    occasion: 'Khai trương',
    promotion: 20, // Promotion: 20% off
  },
  {
    id: '51',
    name: 'Bó Hoa Hồng Kem Sang Trọng',
    description: 'Thể hiện sự trân trọng, thanh lịch và vẻ đẹp tinh tế, thích hợp cho các dịp trang trọng.',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Placeholder for cream roses
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Trắng', // Cream is often grouped with white/light
    type: 'Hoa bó',
    occasion: 'Tình yêu',
  },
  {
    id: '52',
    name: 'Chậu Cây Xương Rồng Mini Độc Đáo',
    description: 'Vẻ đẹp gai góc nhưng đầy sức sống, biểu tượng của sự mạnh mẽ và bền bỉ, món quà khác biệt.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1547820152-f045c2a11b62?auto=format&fit=crop&w=400&q=80', // Placeholder for cactus
    images: [
      'https://images.unsplash.com/photo-1547820152-f045c2a11b62?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1547820152-f045c2a11b62?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Xanh',
    type: 'Hoa chậu',
    occasion: 'Sinh nhật',
  },
  {
    id: '53',
    name: 'Kệ Hoa Tổng Hợp Nhiều Màu Sắc',
    description: 'Sự pha trộn rực rỡ của nhiều loại hoa và màu sắc, mang đến không khí tươi vui và tràn đầy năng lượng.',
    price: 700000,
    image: 'https://images.unsplash.com/photo-1598418585474-061a7a016f46?auto=format&fit=crop&w=400&q=80', // Placeholder for mixed shelf
    images: [
      'https://images.unsplash.com/photo-1598418585474-061a7a016f46?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Tất cả',
    type: 'Hoa kệ',
    occasion: 'Khai trương',
  },
  {
    id: '54',
    name: 'Hộp Hoa Lavender Tím Thủy Chung',
    description: 'Hương thơm dịu nhẹ và sắc tím lãng mạn, biểu tượng của tình yêu thủy chung và sự bình yên.',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1533501711200-a54129528f11?auto=format&fit=crop&w=400&q=80', // Placeholder for lavender
    images: [
      'https://images.unsplash.com/photo-1533501711200-a54129528f11?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Tím',
    type: 'Hộp hoa',
    occasion: 'Valentine',
    bestSeller: true,
  },
  {
    id: '55',
    name: 'Bó Hoa Tulip Đỏ & Trắng Đan Xen',
    description: 'Sự kết hợp hoàn hảo của tình yêu nồng nàn và thuần khiết, mang đến vẻ đẹp hài hòa và ý nghĩa.',
    price: 440000,
    image: 'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80', // Placeholder for mixed tulips
    images: [
      'https://images.unsplash.com/photo-1526462725907-2a4c9b1f2b6e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tulip',
    color: 'Đỏ', // Dominant color
    type: 'Hoa bó',
    occasion: 'Tình yêu',
  },
  {
    id: '56',
    name: 'Giỏ Hoa Cẩm Chướng Xanh Hy Vọng',
    description: 'Màu xanh độc đáo của cẩm chướng mang ý nghĩa của sự hy vọng, bình yên và may mắn.',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // Placeholder for green carnation
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cẩm chướng',
    color: 'Xanh',
    type: 'Hoa giỏ',
    occasion: 'Sinh nhật',
  },
  {
    id: '57',
    name: 'Chậu Hoa Đồng Tiền Cam Rực Rỡ',
    description: 'Sắc cam tươi sáng mang ý nghĩa của sự nhiệt huyết, niềm vui và sự đam mê, thích hợp để tặng bạn bè.',
    price: 270000,
    image: 'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80', // Placeholder for orange gerbera
    images: [
      'https://images.unsplash.com/photo-1518349206103-68f7b76e5d88?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Đồng tiền',
    color: 'Khác', // Orange
    type: 'Hoa chậu',
    occasion: 'Sinh nhật',
  },
  {
    id: '58',
    name: 'Bó Hoa Cẩm Tú Cầu Trắng Tinh Khôi',
    description: 'Vẻ đẹp tinh khiết, tượng trưng cho sự thuần khiết và khởi đầu mới, phù hợp cho lễ cưới hoặc kỷ niệm.',
    price: 360000,
    image: 'https://images.unsplash.com/photo-1587393433986-e4d0c1e8d1b1?auto=format&fit=crop&w=400&q=80', // Placeholder for white hydrangea
    images: [
      'https://images.unsplash.com/photo-1587393433986-e4d0c1e8d1b1?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1599557434199-31e34b9d5c41?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Cẩm tú cầu',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Hoa cưới',
  },
  {
    id: '59',
    name: 'Kệ Hoa Lan Hồ Điệp Đỏ Rực Rỡ',
    description: 'Mang ý nghĩa của sự nhiệt huyết, may mắn và thịnh vượng, là điểm nhấn ấn tượng cho khai trương.',
    price: 720000,
    image: 'https://images.unsplash.com/photo-1620202068940-a19f20c4c4e7?auto=format&fit=crop&w=400&q=80', // Placeholder for red orchid
    images: [
      'https://images.unsplash.com/photo-1620202068940-a19f20c4c4e7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1597818788434-5f5f4f89f2d6?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lan',
    color: 'Đỏ',
    type: 'Hoa kệ',
    occasion: 'Khai trương',
  },
  {
    id: '60',
    name: 'Giỏ Hoa Tổng Hợp "Nắng Xuân"',
    description: 'Sự kết hợp tươi sáng của các loài hoa mùa xuân, mang đến không khí tươi mới, tràn đầy sức sống và niềm vui.',
    price: 390000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', // Placeholder for mixed spring flowers
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Vàng', // Dominant for "spring sun"
    type: 'Hoa giỏ',
    occasion: 'Sinh nhật',
    bestSeller: true,
  },
  {
    id: '61',
    name: 'Hộp Hoa Hồng Xám Độc Lạ',
    description: 'Vẻ đẹp hiện đại, cá tính và đầy bí ẩn, dành cho những ai yêu thích sự độc đáo và khác biệt.',
    price: 580000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', // Placeholder for grey roses
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Hồng',
    color: 'Khác', // Grey
    type: 'Hộp hoa',
    occasion: 'Tình yêu',
  },
  {
    id: '62',
    name: 'Bó Hoa Thủy Tiên Trắng Tinh Khôi',
    description: 'Biểu tượng của sự trong sáng, niềm hy vọng và vẻ đẹp thuần khiết, mang đến sự tươi mới.',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Placeholder for daffodil
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Sinh nhật',
  },
  {
    id: '63',
    name: 'Chậu Cây Phát Lộc Bốn Mùa',
    description: 'Mang ý nghĩa tài lộc, may mắn và sự phát triển bền vững, là món quà khai trương lý tưởng.',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1542845688-6623e5900593?auto=format&fit=crop&w=400&q=80', // Placeholder for lucky bamboo/money tree
    images: [
      'https://images.unsplash.com/photo-1542845688-6623e5900593?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583093121111-e6e2a9d8c8c7?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khác',
    color: 'Xanh',
    type: 'Hoa chậu',
    occasion: 'Khai trương',
  },
];