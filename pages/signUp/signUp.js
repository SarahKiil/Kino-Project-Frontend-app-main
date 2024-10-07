import { API_URL } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export async function initSignUp() {
  const signupButton = document.getElementById("signupButton");
  const signupMessage = document.getElementById("signupMessage");

  signupButton.addEventListener("click", async () => createUser());
}

async function createUser() {
    
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    username,
    email,
    password,
  };

  try {
    const response = await fetch(API_URL + "/users", makeOptions("POST", data, false));

    if (response.ok) {
      signupMessage.textContent = "Sign up successful!";
    } else {
      const errorData = await response.json();
      signupMessage.textContent = `Sign up failed: ${errorData.message}`;
    }
  } catch (error) {
    console.error("Error:", error);
    signupMessage.textContent = "An error occurred during sign up.";
  }
}
