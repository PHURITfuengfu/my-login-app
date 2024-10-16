# ใช้ Node.js image จาก Docker Hub
FROM node:14

# ตั้งค่า working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และติดตั้ง dependencies
COPY package.json ./
RUN npm install

# คัดลอกโค้ดที่เหลือทั้งหมด
COPY . .

# เปิดพอร์ตที่แอปจะรัน
EXPOSE 3000

# คำสั่งรันแอปพลิเคชัน
CMD ["npm", "start"]
