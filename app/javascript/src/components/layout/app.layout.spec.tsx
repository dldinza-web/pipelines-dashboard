import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AppLayout from './app.layout';
import { BrowserRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { CURRENT_USER_LSTG_KEY } from '../pages/sign-in/constants/sign-in.constants';

describe('AppLayout', () => {
  it('renders tite and any children', () => {
    const title = 'The Title';
    const children = <p>Content</p>;

    const comp = render(
      <BrowserRouter>
        <AppLayout title={title}>{children}</AppLayout>
      </BrowserRouter>
    );

    expect(comp.getByText(title)).toBeDefined();
    expect(comp.getByText('Content')).toMatchSnapshot(
      ReactDOMServer.renderToString(children)
    );
    expect(comp.queryByText('username')).toBeNull();
    expect(comp.queryByRole('button', { name: 'Logout' })).toBeNull();
  });

  it('shows the logged username', () => {
    const user = {
      id: 1,
      username: 'ryan@testing.com',
      __typename: 'User',
    };
    localStorage.setItem(CURRENT_USER_LSTG_KEY, JSON.stringify(user));

    const comp = render(
      <BrowserRouter>
        <AppLayout title={'App Layout'}>
          <p>Content</p>
        </AppLayout>
      </BrowserRouter>
    );
    expect(comp.getByText(user.username)).toBeDefined();
  });

  it('users can loggout', () => {
    const user = {
      id: 1,
      username: 'ryan@testing.com',
      __typename: 'User',
    };
    localStorage.setItem(CURRENT_USER_LSTG_KEY, JSON.stringify(user));

    const comp = render(
      <BrowserRouter>
        <AppLayout title={'App Layout'}>
          <p>Content</p>
        </AppLayout>
      </BrowserRouter>
    );

    const btnLogout = comp.getByRole('button', { name: 'Logout' });

    if (btnLogout) {
      fireEvent.click(btnLogout);

      expect(comp.queryByText('username')).toBeNull();
      expect(comp.queryByRole('button', { name: 'Logout' })).toBeNull();
      expect(localStorage.getItem(CURRENT_USER_LSTG_KEY)).toBeNull();
    }
  });
});
