 # 🗳️ Online Poll Voting Application

A full-stack poll voting application built using **Spring Boot**, **Angular**, and **MySQL**. Users can create polls, vote on available options, and view poll results in real time.

## 🚀 Features

- Create new polls
- Add multiple voting options
- View all available polls
- View individual poll details
- Vote for a poll option
- Automatic vote counting
- RESTful API architecture
- Angular frontend with responsive UI
- MySQL database integration

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- Maven
- MySQL

### Frontend
- Angular 22
- TypeScript
- Bootstrap 5

### Tools
- Git
- GitHub

---

## 📁 Project Structure

```text
Online-Poll-Voting-application/
│
├── vottingapp/
│   ├── src/main/java/com/voting/vottingapp/
│   │   ├── controllers/
│   │   ├── Services/
│   │   ├── model/
│   │   ├── repositories/
│   │   └── request/
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   └── votting-app-front/
│       ├── src/
│       ├── package.json
│       └── angular.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### Clone Repository

```bash
git clone https://github.com/SPIDEY777/Online-Poll-Voting-application-.git
cd Online-Poll-Voting-application-/vottingapp
```

### Configure MySQL

Create a database:

```sql
CREATE DATABASE voting_app;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/voting_app
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### Run Spring Boot Application

```bash
./mvnw spring-boot:run
```

Or:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## 🎨 Frontend Setup

Navigate to Angular project:

```bash
cd votting-app-front
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
ng serve
```

Frontend runs on:

```text
http://localhost:4200
```

---

## 📡 API Endpoints

### Create Poll

```http
POST /api/polls
```

Request Body:

```json
{
  "question": "Which programming language do you prefer?",
  "options": [
    {
      "voteOption": "Java"
    },
    {
      "voteOption": "Python"
    }
  ]
}
```

---

### Get All Polls

```http
GET /api/polls
```

---

### Get Poll By ID

```http
GET /api/polls/{id}
```

---

### Vote On Poll

```http
POST /api/polls/vote
```

Request Body:

```json
{
  "pollId": 1,
  "optionIndex": 0
}
```

---

## 🏗️ Database Model

### Poll

| Field | Type |
|---------|---------|
| id | Long |
| question | String |
| options | List<OptionVote> |

### OptionVote

| Field | Type |
|---------|---------|
| voteOption | String |
| voteCount | Long |

---

## 🔮 Future Improvements

- User Authentication (JWT)
- Admin Dashboard
- Poll Expiration
- Duplicate Vote Prevention
- Vote Analytics & Charts
- Email Verification
- Docker Deployment
- Cloud Hosting

---

## 👨‍💻 Author

### Kunal Sharma

- LinkedIn: https://www.linkedin.com/in/kunal-sharma-penetration-tester/
- GitHub: https://github.com/SPIDEY777

---

## ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub.
