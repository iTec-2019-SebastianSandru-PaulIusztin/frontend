import React from 'react';

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setCredentials(credentials) {
  localStorage.setItem('credentials', JSON.stringify(credentials))
}

export function getCredentials() {
  return JSON.parse(localStorage.getItem('credentials'))
}

export function clear() {
    localStorage.clear()
}
