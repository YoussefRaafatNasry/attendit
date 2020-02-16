import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

test("check navbar links", () => {
  const { getByText } = render(<App />);
  const eventsLink = getByText(/^events$/i);
  const authLink = getByText(/^authenticate$/i);
  expect(eventsLink).not.toBeNull();
  expect(authLink).not.toBeNull();
});

test("check email/password inputs", () => {
  const { getByPlaceholderText } = render(<App />);
  const emailInput = getByPlaceholderText(/email/i);
  const passwordInput = getByPlaceholderText(/password/i);
  expect(emailInput.nodeName).toEqual('INPUT');
  expect(passwordInput.nodeName).toEqual('INPUT');
});

test("check login/register buttons", () => {
  const { getByText } = render(<App />);
  const loginButton = getByText(/^login$/i);
  const registerButton = getByText(/^register$/i);
  expect(loginButton.nodeName).toEqual('BUTTON');
  expect(registerButton.nodeName).toEqual('BUTTON');
});
