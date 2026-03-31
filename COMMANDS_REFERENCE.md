# ⚙️ COMMANDS REFERENCE - Local3R MySQL Backend

## 🚀 Quick Command Guide

All commands are meant to be run from the `backend/` folder.

---

## 📥 Initial Setup (First Time Only)

### 1. Navigate to Backend
```bash
cd d:\Website\Local3R\backend
```

### 2. Install Dependencies
```bash
npm install
```
⏱️ Takes 5-10 minutes
📦 Installs: express, sequelize, mysql2, bcryptjs, cors, dotenv, etc.

---

## 🔥 Development Commands

### Start Server (Development Mode - Auto Reload)
```bash
npm run dev
```
✅ Expected output:
```
✅ MySQL kết nối thành công!
✅ Database sync hoàn tất!

============================================================
  🚀 Local3R Backend Server
  ✅ Running on http://localhost:5000
  🗄️  Database: MySQL (Sequelize)
============================================================
```

**To Stop:** Press `Ctrl + C` in terminal

---

### Start Server (Production Mode)
```bash
npm start
```
⚠️ No auto-reload - restart manually if code changes

---

## 💾 Database Commands

### Seed Database (Add Sample Data)
```bash
npm run seed
```
✅ Adds 12 sample Vietnamese specialty products
- 4 products from Bắc region
- 4 products from Trung region  
- 4 products from Nam region

**Note:** Run only once! Running twice may fail due to duplicate data.

---

### Connect to MySQL (From Terminal)
```bash
mysql -u root
```

**Inside MySQL CLI:**
```sql
-- Check databases
SHOW DATABASES;

-- Use local3r database
USE local3r;

-- View all tables
SHOW TABLES;

-- View products
SELECT * FROM products;

-- View orders
SELECT * FROM orders;

-- View users
SELECT * FROM users;

-- View table structure
DESCRIBE products;

-- Count records
SELECT COUNT(*) FROM products;

-- Exit
EXIT;
```

---

### Backup Database
```bash
# Backup to file
mysqldump -u root local3r > backup_local3r.sql

# Restore from file
mysql -u root local3r < backup_local3r.sql
```

---

### Reset Database (Fresh Start)
```bash
# Drop database
mysql -u root
DROP DATABASE local3r;
CREATE DATABASE local3r CHARACTER SET utf8mb4;
EXIT;

# Restart server to recreate tables
npm run dev

# Optional: seed data
npm run seed
```

---

## 🧪 Testing Commands

### Test API Endpoints (Using cURL)

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Get All Products
```bash
curl "http://localhost:5000/api/products?region=Bắc&page=1&limit=10"
```

#### Get Product by ID
```bash
curl http://localhost:5000/api/products/1
```

#### Create Product (Requires POST)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cà Phê Test",
    "description": "Test coffee",
    "price": 100000,
    "region": "Bắc",
    "stock": 50,
    "category": "Cà Phê"
  }'
```

#### Get All Orders
```bash
curl "http://localhost:5000/api/orders?status=pending&page=1&limit=10"
```

---

## 📦 Dependency Management

### Check Installed Packages
```bash
npm list --depth=0
```

### Install Specific Package
```bash
npm install <package_name>
```

### Update All Packages
```bash
npm update
```

### Remove Package
```bash
npm uninstall <package_name>
```

### Clear npm Cache (If Issues)
```bash
npm cache clean --force
```

---

## 🔧 Troubleshooting Commands

### Check if Port 5000 is in Use
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Kill Process on Port 5000
```bash
# Windows
taskkill /PID <process_id> /F

# Mac/Linux
kill -9 <process_id>
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Reinstall Everything (Nuclear Option)
```bash
# Delete dependencies
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 🗂️ File Organization

### Check Project Structure
```bash
# Windows
dir /s

# Mac/Linux
find . -type f -name "*.js" | head -20
```

### View Environment File
```bash
# Windows
type .env

# Mac/Linux
cat .env
```

### Edit Environment File
```bash
# Windows (Notepad)
notepad .env

# Visual Studio Code
code .env

# Mac/Linux (Nano)
nano .env
```

---

## 🔐 XAMPP MySQL Commands

### Start MySQL (Windows - PowerShell)
```bash
# Start service
net start MySQL80

# Stop service
net stop MySQL80

# Check service status
Get-Service MySQL80
```

### Start MySQL (Mac)
```bash
sudo /opt/xampp/bin/mysql.server start
sudo /opt/xampp/bin/mysql.server stop
sudo /opt/xampp/bin/mysql.server status
```

### Start MySQL (Linux)
```bash
sudo /etc/init.d/mysql start
sudo /etc/init.d/mysql stop
sudo /etc/init.d/mysql status
```

---

## 📊 Common Development Workflow

### First Time Setup
```bash
# 1. Start XAMPP MySQL (GUI or command)
net start MySQL80

# 2. Create database
mysql -u root
CREATE DATABASE local3r CHARACTER SET utf8mb4;
EXIT;

# 3. Navigate to backend
cd d:\Website\Local3R\backend

# 4. Install dependencies
npm install

# 5. Start server
npm run dev

# 6. In another terminal, seed data (optional)
npm run seed
```

### Daily Development
```bash
# 1. Start XAMPP MySQL
net start MySQL80

# 2. Navigate to backend
cd d:\Website\Local3R\backend

# 3. Start development server
npm run dev

# 4. Use Postman to test APIs

# 5. Stop server when done
Ctrl + C
```

### After Code Changes
```bash
# If using npm run dev: Auto-reloads automatically
# Just save file and refresh browser/Postman

# If using npm start: Manually restart
Ctrl + C
npm start
```

---

## 🔍 Debugging Commands

### View Server Logs
```bash
# Pipe output to file (Windows)
npm run dev > server.log 2>&1

# Then view log
Get-Content server.log

# Watch log in real-time
Get-Content server.log -Wait
```

### Enable SQL Query Logging
```javascript
// In config/database.js, change:
logging: false
// To:
logging: console.log
```

---

## 📝 Environment Variables Commands

### View Current .env
```bash
# Windows
type backend\.env

# Mac/Linux
cat backend/.env
```

### Edit .env (VS Code)
```bash
code .env
```

### Set Temporary Env Var (Windows PowerShell)
```bash
$env:NODE_ENV='production'
echo $env:NODE_ENV
```

### Set Temporary Env Var (Mac/Linux)
```bash
export NODE_ENV=production
echo $NODE_ENV
```

---

## 🚀 Deployment Commands

### Build Project (if TypeScript)
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Export Environment to File
```bash
npm env > project_env.txt
```

---

## 🎯 Postman Testing Quick Commands

All these can be tested in Postman GUI:

```
1. Health Check
   GET http://localhost:5000/api/health

2. List Products
   GET http://localhost:5000/api/products

3. Create Product
   POST http://localhost:5000/api/products
   Body: { name, description, price, region, stock, category }

4. Update Product
   PUT http://localhost:5000/api/products/1
   Body: { price: 120000 }

5. Delete Product
   DELETE http://localhost:5000/api/products/1

6. Create Order
   POST http://localhost:5000/api/orders
   Body: { items, totalPrice, paymentMethod, customerInfo }

7. List Orders
   GET http://localhost:5000/api/orders

8. Update Order
   PUT http://localhost:5000/api/orders/1
   Body: { status: 'shipped', trackingNumber: '...' }

9. Cancel Order
   DELETE http://localhost:5000/api/orders/1
```

---

## ⚡ Quick Reference Cheat Sheet

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Start prod server | `npm start` |
| Seed database | `npm run seed` |
| Connect to MySQL | `mysql -u root` |
| View logs | `npm run dev 2>&1 \| tee server.log` |
| Kill port 5000 | `netstat -ano \| findstr :5000` |
| Clear cache | `npm cache clean --force` |
| Reinstall | `rm -rf node_modules && npm install` |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |

---

## 🆘 Emergency Commands

### If Server Won't Start
```bash
# 1. Stop any running processes
Ctrl + C

# 2. Verify port is free
netstat -ano | findstr :5000

# 3. Kill if needed
taskkill /PID <number> /F

# 4. Verify MySQL is running
mysql -u root -e "SELECT 1"

# 5. Try again
npm run dev
```

### If Database Is Corrupted
```bash
# 1. Stop server
Ctrl + C

# 2. Reset database
mysql -u root
DROP DATABASE local3r;
CREATE DATABASE local3r CHARACTER SET utf8mb4;
EXIT;

# 3. Start server (auto-creates tables)
npm run dev

# 4. Optionally seed data
npm run seed
```

### If npm Modules Are Broken
```bash
# Complete reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

**Last Updated:** 31-03-2026
**Version:** 1.0 - MySQL Edition
