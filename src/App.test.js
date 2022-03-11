import { render, screen } from '@testing-library/react';
import App from './App';
import { useReducer } from 'react';
import React, { Component } from 'react';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
