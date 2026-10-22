# 🔎 GitHub Profile Finder

> **Explore GitHub profiles, discover repositories, and understand the JavaScript behind every API request.**

GitHub Profile Finder is a front-end web application that lets users search for a GitHub username and explore information about that developer, including their profile details, repositories, and programming languages.

I built this project to strengthen my understanding of **JavaScript, DOM manipulation, asynchronous programming, Promises, and working with APIs**. It combines a practical interface with the core concepts that make modern, data-driven websites work.

## ✨ Features

- 🔍 **GitHub User Search** — Search for a developer using their GitHub username.
- 👤 **Profile Information** — Retrieve publicly available profile details through the GitHub REST API.
- 📦 **Repository Exploration** — Fetch and display the user's public repositories.
- 💻 **Language Insights** — Visualize programming languages associated with repositories.
- ⚡ **Dynamic DOM Updates** — Update page content with JavaScript without manually editing the HTML for every search.
- 🌐 **Asynchronous Data Fetching** — Request information from GitHub without blocking the main thread while waiting for a response.
- 🎨 **Responsive UI Design** — Present profile information in a structured, card-based interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structures the web page and its content |
| CSS / Tailwind CSS | Styles the interface and its components |
| JavaScript (ES6+) | Handles user interactions, data processing, and rendering |
| DOM API | Selects and updates HTML elements dynamically |
| Fetch API | Makes HTTP requests to GitHub |
| Promises | Represents the eventual success or failure of asynchronous operations |
| `async/await` | Makes asynchronous JavaScript easier to read and organize |
| GitHub REST API | Supplies public profile and repository data |

## 🧠 What I Learned: JavaScript Concepts in Practice

This project is more than a profile search interface. It helped me understand how JavaScript connects user interactions, remote data, and the page a user sees.

### 1. DOM Manipulation — Making the Page Dynamic

The **Document Object Model (DOM)** represents an HTML document as a tree of objects that JavaScript can access and modify.

Instead of creating a separate HTML page for every GitHub user, I use JavaScript to select existing elements and update their content dynamically.

For example:

```javascript
let languageContainer = document.querySelector("#languages-container");
let profileContainer = document.querySelector(".profile_card");
```

Here, `document.querySelector()` selects HTML elements using CSS selectors.

JavaScript can then update those elements:

```javascript
profileContainer.innerHTML = `
  <h2>${user.login}</h2>
  <p>${user.bio || "No bio available."}</p>
`;
```

The template literal allows HTML to be generated using values returned by the API.

**Key concepts explored:**

- `document.querySelector()` — selecting elements.
- `innerHTML` — updating an element's HTML content.
- Template literals — combining strings and dynamic values.
- DOM-based rendering — displaying API data inside the existing page.
- Event listeners — responding to user actions, such as submitting a search form.

**The takeaway:** HTML provides the structure, but JavaScript can change what appears on the page based on user input and fetched data.

> **Security note:** When rendering data from an external API, inserting values directly through `innerHTML` requires care. For untrusted text, prefer `textContent` and DOM methods where possible.

### 2. The Fetch API — Communicating With GitHub

A profile finder needs information from somewhere. In this project, that source is the GitHub REST API.

The Fetch API allows JavaScript to make HTTP requests:

```javascript
fetch(`https://api.github.com/users/${username}`)
  .then(response => response.json())
  .then(user => {
    console.log(user);
  });
```

This request asks GitHub for information about the specified user.

Let's break it down:

1. `fetch()` sends an HTTP request to the API endpoint.
2. The request returns a Promise representing the response.
3. `response.json()` reads the response body and parses its JSON data.
4. The parsed user object can then be used to update the interface.

GitHub returns structured data containing fields such as the username, avatar URL, bio, public repository count, and profile URL.

**The takeaway:** An API acts as a bridge between my application and an external source of data.

### 3. Promises — Understanding Asynchronous JavaScript

An API request does not finish immediately. Network communication takes time, and JavaScript needs a way to represent an operation whose result will become available later.

That's where **Promises** come in.

A Promise represents the eventual completion or failure of an asynchronous operation. It can be in one of three states:

- **Pending:** The operation is still in progress.
- **Fulfilled:** The operation completed successfully.
- **Rejected:** The operation failed.

In JavaScript, `.then()` handles a fulfilled Promise, while `.catch()` can handle a rejection.

```javascript
fetch(`https://api.github.com/users/${username}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("GitHub user not found.");
    }

    return response.json();
  })
  .then(user => {
    console.log(user.login);
  })
  .catch(error => {
    console.error("Something went wrong:", error);
  });
```

Notice the `response.ok` check. A response such as HTTP 404 does **not** automatically reject the Promise returned by `fetch()`. Checking the status lets the application handle unsuccessful HTTP responses explicitly.

**The takeaway:** Promises let JavaScript work with results that are not available immediately, while providing a way to handle success and failure.

### 4. `async/await` — Writing Asynchronous Code More Clearly

Promises are powerful, but chaining multiple `.then()` calls can become harder to follow as a task grows.

JavaScript provides `async/await` as another way to work with Promises.

An `async` function always returns a Promise. Inside it, `await` pauses that function's execution until the awaited Promise settles, without blocking the main JavaScript thread.

For example:

```javascript
async function getUserData(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch GitHub user.");
  }

  const user = await response.json();

  return user;
}
```

Here's what happens:

1. The function starts running.
2. `fetch()` sends the request.
3. `await` waits for the response Promise to settle.
4. The response body is parsed as JSON.
5. The function returns the resulting user object.

Errors can be handled with `try...catch`:

```javascript
async function searchUser(username) {
  try {
    const user = await getUserData(username);
    console.log(user);
  } catch (error) {
    console.error(error.message);
  }
}
```

**The takeaway:** `async/await` doesn't replace Promises. It provides a cleaner syntax for working with them.

### 5. Connecting Everything — From Search to Results

The most important part of this project is understanding how the concepts work together.

<escape>
User enters a GitHub username
            ↓
JavaScript handles form submission
            ↓
Fetch API requests GitHub data
            ↓
Promises / async-await handle the response
            ↓
JavaScript processes the returned JSON
            ↓
DOM manipulation updates the page
            ↓
The user sees the profile and repositories
</escape>

This is the fundamental workflow behind many interactive web applications: **capture an event, request data, process the result, and render the interface.**

## 🔌 GitHub API Endpoints

The application uses publicly accessible GitHub REST API endpoints.

| Endpoint | Purpose |
|---|---|
| `/users/{username}` | Retrieves public profile information |
| `/users/{username}/repos` | Retrieves the user's public repositories |

Example:

```text
https://api.github.com/users/octocat
https://api.github.com/users/octocat/repos
```

Replace `octocat` with another GitHub username to request different data.

For more details, see the official [GitHub REST API documentation](https://docs.github.com/en/rest).

## 🚀 Getting Started

Run the project locally in a few simple steps.

### Prerequisites

- A modern web browser.
- A code editor, such as Visual Studio Code.
- Git, if you want to clone the repository.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/github-profile-finder.git
```

**2. Navigate to the project directory**

```bash
cd github-profile-finder
```

**3. Open the project**

Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code for a convenient local development workflow.

**4. Search for a GitHub user**

Enter a public GitHub username and explore the information displayed by the application.

> Replace `YOUR-USERNAME` and `github-profile-finder` with your actual GitHub username and repository name.

## 📁 Project Structure

```text
github-profile-finder/
│
├── index.html      # Page structure and layout
├── script.js       # JavaScript logic and API requests
└── README.md       # Project documentation
```

The filenames in this structure should match the actual files in the repository. If your JavaScript file has a different name, update the HTML script reference or rename the file accordingly.

## ⚠️ Current Limitations

- Only publicly accessible profile and repository information is available without additional authentication.
- GitHub API rate limits can affect how frequently requests can be made.
- Repository results may be incomplete if the application retrieves only the API's default page of results.
- Language statistics derived from repository metadata may represent the number of repositories associated with each language, rather than the actual volume of code written in that language.
- Network failures, invalid usernames, and unsuccessful API responses should be handled gracefully to improve reliability.

These limitations also provide opportunities for future improvements.

## 🔮 Future Improvements

- [ ] Add better loading, error, and empty-result states.
- [ ] Implement pagination to retrieve more repositories.
- [ ] Add sorting by stars, forks, and recently updated repositories.
- [ ] Make the profile's **View Profile** button open the corresponding GitHub page.
- [ ] Display repository descriptions, stars, forks, and primary languages.
- [ ] Improve language visualizations using GitHub's repository language endpoints.
- [ ] Improve accessibility and mobile responsiveness.
- [ ] Refine API error handling and prevent stale results from previous searches.

## 🎯 Project Goals

Through this project, I am working toward a stronger understanding of:

- How the browser represents and updates HTML through the DOM.
- How event listeners connect user actions to JavaScript functions.
- How HTTP requests retrieve data from external APIs.
- How Promises represent asynchronous operations.
- How `async/await` simplifies asynchronous control flow.
- How JSON responses can be transformed into meaningful UI components.
- How to organize a small front-end project into understandable pieces.

## 💡 Final Thoughts

Building this project helped me connect JavaScript concepts that can seem abstract when learned individually.

**The DOM makes the page interactive. The Fetch API brings in external data. Promises represent asynchronous results. And `async/await` makes the workflow easier to reason about.**

The goal isn't just to make the application work—it's to understand *why* it works.

This is a learning project, and I intend to keep improving it as I explore more of JavaScript and front-end development.

---

**Built with curiosity, JavaScript, and a little help from the GitHub API.** 💻

