import { API_URL} from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("close").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
  });

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e)=> {
    e.preventDefault();
    login()
});
}

async function login() {
  const formData = new FormData(loginForm);
  const username = formData.get("username");
  const password = formData.get("password");
  const loggedInMessage = document.getElementById("loggedInMessage");


  try {
    const response = await fetch(
      API_URL + "/auth/login",
      makeOptions("POST", { username, password }, false)
    );

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const loggedInUser = data.username;
      console.log(data.token);
      const roles = data.roles;

      // Display the logged-in message
      loggedInMessage.textContent = `Logged in as ${loggedInUser}`;
      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUser);
      localStorage.setItem("roles", roles);
      document.getElementById(
        "loggedInAs"
      ).innerHTML = `Logged in as ${localStorage.getItem(
        "username"
      )}<a href="signOut" data-navigo style="margin-left: 10px; margin-right: 10px; font-size: 12px;">Sign Out</a>`;
      window.router.navigate("/#")
      toggleLoginStatus()
    } else {
      loggedInMessage.textContent =
        "Login failed. Please check your credentials.";
    }
  } catch (error) {
    console.error("Error:", error);
    loggedInMessage.textContent = "An error occurred during login.";
  }

  
}

export function toggleLoginStatus(){


  const adminListItems = document.querySelectorAll(".admin-only");
  const userListItems = document.querySelectorAll(".user-only");

  let isAdmin = false;
  let isUser = false;
  
  console.log(localStorage.getItem("roles"));

  if (localStorage.getItem("roles")){
    isAdmin = localStorage.getItem("roles").includes("ADMIN");
    isUser = localStorage.getItem("roles").includes("USER");
  }
  for (let i = 0; i < adminListItems.length; i++){
    adminListItems[i].style.display = isAdmin ? "block" : "none";
  }
  for (let i = 0; i < userListItems.length; i++){
    userListItems[i].style.display = isUser ? "block" : "none";
  }
}
