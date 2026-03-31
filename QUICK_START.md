# 🎯 Quick Start Guide - Local3R

## ⚡ 5분 안에 시작하기

### 1️⃣ 요구사항
- Node.js 16+
- MongoDB 4.0+
- Git

### 2️⃣ 설치
```bash
# Clone repository
git clone https://github.com/yourusername/Local3R.git
cd Local3R

# Windows 사용자
setup.bat

# macOS/Linux 사용자
bash setup.sh
```

### 3️⃣ 환경 설정
```bash
# Backend .env 수정
cd backend
nano .env  # 또는 에디터로 열기

# MongoDB URI 설정
MONGODB_URI=mongodb://localhost:27017/local3r
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4️⃣ 실행
```bash
# Terminal 1: MongoDB 시작
mongod

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend  
cd frontend && npm run dev
```

### 5️⃣ 접근
- 🏠 **홈**: http://localhost:3000
- 📊 **관리자**: http://localhost:3000/admin
- 🔌 **API**: http://localhost:5000/api

---

## 📚 주요 파일 위치

| 기능 | 위치 |
|------|------|
| 홈페이지 | `frontend/src/pages/index.tsx` |
| 장바구니 | `frontend/src/pages/cart.tsx` |
| 관리자 | `frontend/src/pages/admin/` |
| 상품 API | `backend/src/routes/productRoutes.js` |
| 주문 처리 | `backend/src/controllers/orderController.js` |
| 데이터베이스 | `backend/src/models/` |

---

## 🐛 문제 해결

### MongoDB 연결 실패
✅ MongoDB가 실행 중인지 확인
✅ MONGODB_URI가 올바른지 확인

### CORS 오류
✅ FRONTEND_URL 확인
✅ 브라우저 캐시 전체 삭제

### 포트 사용 중
```bash
# 포트 5000 사용 프로세스 확인
lsof -i :5000
# 또는 Windows에서
netstat -ano | findstr :5000
```

---

## 📞 도움말
- 📧 Email: support@local3r.com
- 📱 Phone: 0243 123 456
- 💬 Discord: [Join our community]

**행운을 빕니다! 🎉**
