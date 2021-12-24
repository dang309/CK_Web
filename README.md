### Yêu cầu:

`10.x.x <= nodejs <= 16.x.x, dotnet sdk 5.x.x`

### Cài đặt và chạy:

**Bước 1:**
`git clone https://github.com/HaiDang309/CK_Web.git <YOUR_FOLDER>`

**Bước 2:**
`cd <YOUR_FOLDER>/fe`
`yarn && yarn start` hoặc `npm install && npm start`

**Bước 3:**
import file `ck_web.bacpac` vào sql server

**Bước 4:**
Copy file `.example.env` và đổi tên file vừa copy thành `.env` và điền thông tin tài khoản và mật khẩu của email trong file `.env` đó

**Bước 5:**
`cd <YOUR_FOLDER>/server`
`dotnet watch run`

### Lưu ý:

Khuyến khích sử dụng VSCODE cho phần .net
