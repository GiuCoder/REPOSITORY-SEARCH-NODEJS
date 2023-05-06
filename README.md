# 📁 Repository Search NodeJS
Repository Search NodeJS is a web application built with Express.js that allows users to search for repositories on GitHub. The application uses the GitHub API to search for repositories and display information about them, such as the repository name, description, creation date, license, language, owner email, source, and IP address.

Features
- 🕰️ Rate Limiter Middleware: The application includes a rate limiter middleware to prevent excessive requests from a single IP address. If a user makes too many requests in a 15-minute window, they will receive an error message and be asked to try again later.
- 🐝 Honeypot Field: To prevent spam bots from using the application, a honeypot field has been added to the search form. If the honeypot field is filled out, the application assumes the user is a bot and displays an error message.
- 🔍 404 Error Page: If a user enters a repository name that does not exist on GitHub, the application will return a 404 error page.

Getting Started
📋 Prerequisites
Before running the application, you must have Node.js installed on your computer. You can download Node.js from the official website.

# 🚀 Installing
To install the application, follow these steps:

- Clone the repository to your local machine using Git.
- Open a terminal window and navigate to the project directory.
- Run npm install to install the project dependencies.
- Run npm start to start the application.
- Open a web browser and navigate to http://localhost:3000.
# 🛠️ Built With
- [Express.js - Web framework for Node.js](https://expressjs.com/)
- [GitHub API Documentation](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- [express-rate-limit Documentation](https://www.npmjs.com/package/express-rate-limit)

# 👤 Authors
GiuCoder

# 📄 License
This project is licensed under the MIT License - see the [LICENSE](https://raw.githubusercontent.com/GiuCoder/REPOSITORY-SEARCH-NODEJS/main/LICENSE) file for details.

# Acknowledgments

- [GitHub API Documentation](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- [express-rate-limit Documentation](https://www.npmjs.com/package/express-rate-limit)

# Disclaimer
The content and information provided by GiuCoder is for educational purposes only. The techniques and tools described in any of the content on this platform, including but not limited to code and tutorials, are intended to be used solely for the purpose of learning about ethical hacking and enhancing cybersecurity knowledge.

The use of any of the techniques or tools described in GiuCoder's content for any other purpose, including but not limited to malicious or unauthorized activities, is strictly prohibited.

GiuCoder does not encourage or condone any illegal activities or unethical behavior. Users of this platform are solely responsible for their actions and the consequences of such actions. GiuCoder will not be held liable for any damages resulting from the misuse or improper use of any of the information or techniques provided.

# 📱 Social Media

- [YouTube](https://www.youtube.com/channel/UCFH1zkg-QNOCk-c6mfUgCjA)
