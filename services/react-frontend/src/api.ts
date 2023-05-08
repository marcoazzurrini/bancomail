const apiUrl = "http://localhost:8080/api/";

export async function register(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error(`Failed to register: ${response.statusText}`);
  }

  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(email + ":" + password),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to log in: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json();
}

export async function checkAuthStatus() {
  try {
    const response = await fetch(`${apiUrl}/checkAuth`, {
      credentials: "include",
    });
    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    return false;
  }
}
