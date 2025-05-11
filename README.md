# Task App - 3-Tier Application

A simple task management application built with:
- Frontend: React.js
- Backend: Express.js/Node.js
- Database: MongoDB

## Local Development

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd task-app
   ```

2. Start with Docker Compose:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost
   - API: http://localhost:5000/api

## EC2 Deployment (IP: 3.110.159.145)

### Manual Setup:

1. SSH into your instance:
   ```
   ssh ubuntu@3.110.159.145
   ```

2. Install Docker and Docker Compose:
   ```
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo usermod -aG docker ${USER}
   ```

3. Clone and start the application:
   ```
   git clone <your-repo-url>
   cd task-app
   docker-compose up -d --build
   ```

### Automated Deployment via GitHub Actions:

1. Add these secrets to your GitHub repository:
   - `SSH_PRIVATE_KEY`: Your private SSH key
   - `SSH_KNOWN_HOSTS`: Generated with `ssh-keyscan -H 3.110.159.145`

2. Push to the main branch to trigger deployment:
   ```
   git push origin main
   ```
