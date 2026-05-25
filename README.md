# 🎓 Training & Placement Management System

<div align="center">

## 🚀 Full Stack Training & Placement Portal

A modern **Training & Placement Management System** built using **React, Spring Boot, PostgreSQL, JWT Authentication, Kafka, and Cloudinary** to streamline campus placement activities.

💻 Built for Students, Recruiters & Admins
📧 Kafka-powered Email Notification System
🔐 Secure JWT Authentication & Role-Based Access
☁️ Cloudinary File & Image Upload Support

</div>

---

# ✨ Features

## 👨‍🎓 Student Module

* 🔐 Secure Student Authentication
* 📝 Student Profile Management
* 📄 Resume Upload Support
* 🏢 Browse Placement Drives
* ✅ Register for Drives
* 📊 Track Application Status
* 📚 Learning Resources Access
* 🎯 Eligibility-based Drive Access

---

## 👨‍💼 Admin Module

* 👥 Manage Students
* 🏢 Manage Companies
* 📅 Create & Manage Placement Drives
* 📢 Manage Events & Notifications
* 📊 View Placement Statistics
* 🛠️ Manage Entire Placement Workflow

---

## 🏢 Recruiter Module

* 📝 Create Recruitment Drives
* 👀 View Student Applications
* ✅ Shortlist Eligible Candidates
* 📋 Manage Hiring Process

---

## 📧 Kafka Email Notification System

The project integrates **Apache Kafka** for asynchronous communication.

### 🚀 What it does?

* Sends email notifications to eligible students
* Improves scalability & performance
* Reduces backend response time
* Supports event-driven architecture

---

# 🛠️ Tech Stack

## 🎨 Frontend

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

---

## ⚙️ Backend

<p>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
  <img src="https://img.shields.io/badge/REST_API-005571?style=for-the-badge" />
</p>

---

## 🗄️ Database & Messaging

<p>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Apache_Kafka-000?style=for-the-badge&logo=apachekafka" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
</p>

---

## 🛠️ Tools & Platforms

<p>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" />
</p>

---

# 📁 Project Structure

```bash
TNP-Management-System/
│
├── Front-End/          # React Frontend
│
├── tnp_backend/        # Spring Boot Backend
│
└── README.md
```

---

# 🔐 Authentication & Security

The application uses **JWT Authentication** and **Spring Security**.

### ✅ Security Features

* JWT Token Authentication
* Role-Based Authorization
* Secure REST APIs
* Protected Routes
* Authentication & Authorization Filters

---

# 👤 User Roles

| Role          | Access                                              |
| ------------- | --------------------------------------------------- |
| 👨‍💼 Admin   | Manage students, companies, drives & events         |
| 👨‍🎓 Student | Apply for drives, manage profile & access resources |
| 🏢 Recruiter  | Create drives & shortlist students                  |

---

# ⚙️ Backend Setup

## 1️⃣ Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
cd TNP-Management-System
```

---

## 2️⃣ Configure PostgreSQL

Create a database:

```sql
CREATE DATABASE tnp_database;
```

---

## 3️⃣ Configure application.properties

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/tnp_database
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

# JWT
jwt.secret=YOUR_SECRET_KEY

# Kafka
spring.kafka.bootstrap-servers=localhost:9092

# Cloudinary
cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET
```

---

## 4️⃣ Start Kafka

### Linux/macOS

```bash
# Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Start Kafka
bin/kafka-server-start.sh config/server.properties
```

### Windows

```cmd
bin\windows\zookeeper-server-start.bat config\zookeeper.properties
bin\windows\kafka-server-start.bat config\server.properties
```

---

## 5️⃣ Run Backend

```bash
cd tnp_backend
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🌐 Frontend Setup

## Install Dependencies

```bash
cd Front-End
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🚀 Application Workflow

```text
Admin Creates Drives
        ↓
Students Register for Drives
        ↓
Eligibility Check
        ↓
Kafka Sends Email Notifications
        ↓
Recruiters Shortlist Students
```

---

# 📊 Key Features Overview

| Feature                 | Description                      |
| ----------------------- | -------------------------------- |
| 🔐 JWT Authentication   | Secure Login System              |
| 📧 Kafka Integration    | Asynchronous Email Notifications |
| ☁️ Cloudinary           | Resume/Image Upload Support      |
| 📊 Placement Statistics | Track Placement Data             |
| 📅 Drive Management     | Create & Manage Drives           |
| 🎯 Eligibility System   | Student Eligibility Validation   |

---

# 📸 Screenshots

## 🏠 Home Page

```md
Add Screenshot Here
```

---

## 👨‍🎓 Student Dashboard

```md
Add Screenshot Here
```

---

## 👨‍💼 Admin Dashboard

```md
Add Screenshot Here
```

---

# 🌟 Future Enhancements

* 🤖 AI-based Student Recommendation System
* 📱 Mobile Responsive Enhancements
* 🔔 Real-time Notifications
* 📹 Interview Scheduling System
* 📈 Advanced Analytics Dashboard
* 🧠 Resume Parsing using AI

---

# 🤝 Contributors

## 👨‍💻 Praveen Birla

💻 Java Backend Developer
🚀 Passionate Full Stack Developer

---

# 📬 Contact

📧 Email: birlp409@gmail.com
 
 

---

# ⭐ Support

If you found this project useful, give it a ⭐ on GitHub.

---

<div align="center">

### 🚀 "Building Real-World Scalable Applications with Java & React"

</div>
