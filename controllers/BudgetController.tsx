import AuthService from "../utils/AuthService.tsx";
const authService = new AuthService();

export async function fetchBudget(){
  let token = authService.getToken();

  const response = await fetch("https://localhost:5001/budget", {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
  return response.json();

}

export async function fetchBudgetSummary(){
  let token = authService.getToken();

  const response = await fetch("https://localhost:5001/budget/summary", {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
  return response.json();

}