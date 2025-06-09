# 🎭 Phiên Tòa Xét Xử Hành Vi Gây Khó Chịu

Một trang web vui nhộn giả lập "phiên tòa công lý", nơi bạn có thể xin lỗi người bạn thân một cách hài hước và đáng yêu.

## 🌟 Tính Năng

-   💝 Giao diện thân thiện với người dùng
-   🎁 Hiệu ứng hộp quà và matcha latte
-   ✨ Hiệu ứng confetti khi mở quà
-   🎨 Thiết kế responsive
-   🎯 Tùy chỉnh tội danh và mức phạt
-   📱 Tương thích với mọi thiết bị

## 🚀 Cách Sử Dụng

1. Clone repository:

```bash
git clone https://github.com/your-username/sorry-khc.git
cd sorry-khc
```

2. Chỉnh sửa file `config.js`:

```javascript
const config = {
    yourName: "Tên của bạn",
    herName: "Tên người bạn",
    offenses: [
        "Gửi meme lúc đang học",
        "Nói chuyện vô duyên",
        "Làm phiền khi đang bận"
    ],
    punishments: [
        { icon: "📱", text: "Nhắn tin xin lỗi ít nhất 3 từ" },
        { icon: "⏰", text: "Không làm phiền trong vòng 24h" },
        { icon: "🎁", text: "Tặng một món quà nhỏ" }
    ]
};
```

3. Mở file `index.html` bằng trình duyệt hoặc sử dụng Live Server trong VS Code.

## 🛠️ Công Nghệ Sử Dụng

-   HTML5
-   CSS3 (Flexbox, Grid, Animations)
-   JavaScript (ES6+)
-   Font Awesome Icons
-   Google Fonts

## 🎨 Tùy Chỉnh

### Thay Đổi Màu Sắc

Chỉnh sửa biến CSS trong file `style.css`:

```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #ffe66d;
    --text-color: #2c3e50;
    --background-color: #f7f9fc;
}
```

### Thêm Tội Danh Mới

1. Nhấn nút "Thêm tội danh"
2. Nhập tội danh mới
3. Nhấn "Lưu thay đổi"

### Thêm Mức Phạt Mới

1. Nhấn nút "Chỉnh sửa mức phạt"
2. Nhập icon và nội dung mức phạt
3. Nhấn "Lưu thay đổi"

## 📱 Responsive Design

Trang web được thiết kế để hoạt động tốt trên mọi thiết bị:

-   Desktop
-   Tablet
-   Mobile

## 🎁 Tính Năng Đặc Biệt

-   Hiệu ứng hộp quà 3D
-   Matcha latte với hiệu ứng bong bóng
-   Confetti animation
-   Custom cursor với hình matcha latte
-   Hiệu ứng hover cho các phần tử

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo pull request hoặc mở issue để thảo luận về những thay đổi bạn muốn thực hiện.

## 📝 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Tác Giả

-   Nguyễn Cao Đức - [GitHub](https://github.com/cducdev)

## 🙏 Cảm Ơn

Cảm ơn bạn đã sử dụng dự án này! Hy vọng nó sẽ giúp bạn xin lỗi một cách dễ thương và hiệu quả.
