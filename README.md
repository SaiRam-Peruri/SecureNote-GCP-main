# 🔐 SecureNote – Encrypted Note Sharing Platform (MERN Stack)

**SecureNote** is a production-ready web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that enables secure, anonymous, and self-destructing note sharing. It provides features like **end-to-end encryption**, **password protection**, **read-tracking**, and **auto-expiring links**, making it ideal for privacy-focused users such as journalists, lawyers, or internal teams sharing sensitive data.

## 🚀 Key Features

* 🔒 **End-to-End Encryption**
  Notes are encrypted on the client side and can only be decrypted with a valid key, ensuring complete confidentiality.

* 🕒 **Self-Destructing Notes**
  Notes are automatically deleted after being read once or when they expire at a specified time.

* 🔗 **One-Time Shareable Links**
  Generate secure, single-use URLs for sharing notes.

* 🛡️ **Password Protection**
  Add an extra layer of security by requiring a password to open a note.

* 📩 **Read Notifications**
  Get instant email alerts when a note is accessed.

---
## 🧠 Lessons Learned

### Technical Proficiency

* Designed modular MongoDB schemas and implemented secure Express routes.
* Developed async workflows for encryption/decryption using Node.js.
* Managed secure client-server communication with RESTful APIs.

### Problem-Solving

* Solved encryption challenges while maintaining performance.
* Handled simultaneous note expiration events and email notification race conditions.

### Teamwork & Project Management

* Adopted an Agile workflow with modular milestones.
* Efficient debugging and collaboration helped resolve complex integration issues.

---
## 🐞 Known Issues

* Minor delays in email alerts under heavy server load.
* Rare edge cases in simultaneous note expiration handling.

---
## 🔮 Future Enhancements

* 📎 File attachments (secure image/document sharing)
* 👥 Group notes with multi-user read tracking
* 📶 Offline note creation/viewing
* 🔐 Custom encryption algorithm selection

---
## ☁️ Deployment (Planned on Google Cloud Platform)

In the future, SecureNote will be deployed on **Google Cloud Platform (GCP)** using the following services:

| GCP Service               | Purpose                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| **Cloud Run**             | Host the backend Node.js API in a serverless, scalable environment |
| **Firestore / Atlas**     | MongoDB or Firestore for storing notes securely                    |
| **Cloud Storage**         | (Optional) To store file attachments securely                      |
| **Cloud Scheduler**       | Automate note expiration and cleanup jobs                          |
| **Pub/Sub**               | Handle read-event triggers and email queue messaging               |
| **Cloud Functions**       | Lightweight triggers for self-destruct and notifications           |
| **IAM & Secret Manager**  | Secure access control and environment variables                    |
| **Vercel or GCP Hosting** | Frontend deployment with HTTPS and CDN support                     |

---

## 🛠 Tech Stack

| Technology     | Usage                                |
| -------------- | ------------------------------------ |
| **MongoDB**    | Encrypted data storage (NoSQL DB)    |
| **Express.js** | RESTful API backend                  |
| **React.js**   | Frontend UI and state management     |
| **Node.js**    | Backend runtime and crypto functions |
| **SendGrid**   | Email delivery for read alerts       |
| **Crypto**     | End-to-end encryption of notes       |

---

## 📂 Folder Structure

```
SecureNote/
├── backend/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── utils/
├── .env
└── README.md
```

---

## ⚙️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/SecureNote.git
cd SecureNote

# Start backend
cd backend
npm install
npm start

# Start frontend
cd ../frontend
npm install
npm start
```

> ⚠️ Ensure `.env` contains your MongoDB URI, SendGrid API key, and encryption secrets.

---
## 💼 Ideal Use Cases

* Internal secure messaging in organizations
* Anonymous whistleblower or journalist portals
* Confidential legal or medical data transmission

---

## � Vercel Deployment

This project is now configured for easy deployment on Vercel:

### Prerequisites
- A MongoDB Atlas database
- A Vercel account

### Deployment Steps

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd SecureNote-GCP-main
   npm install
   ```

2. **Environment Variables**
   Set up the following environment variables in your Vercel dashboard:
   - `ATLAS_URL` - Your MongoDB connection string
   - `SESSION_SECRET` - A secure session secret
   - `APP_NAME` - Your application name (e.g., "SecureNote")
   - `HOST_URL` - Will be auto-set by Vercel
   - `NODE_ENV` - Set to "production"

3. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```
   Or connect your GitHub repository to Vercel for automatic deployments.

4. **Domain Configuration**
   The app automatically detects Vercel's domain using `VERCEL_URL` environment variable.

### Local Development
```bash
npm run dev
```

---

## �📣 Final Note

> SecureNote was not just built to showcase a MERN app, but to demonstrate how privacy, encryption, and modern web development can be integrated to create secure, real-world-ready software. Its modular design and scalability make it fit for future deployment on cloud platforms like **GCP** and **Vercel**.


Let me know if you want this content formatted for a GitHub page, or if you'd like help preparing a `Dockerfile` or `cloudbuild.yaml` for GCP deployment.
