import React from 'react';
import { render } from '@testing-library/react';

describe('Project List', () => {
  it('show welcome message', () => {
    const comp2 = render(<p>Hi</p>);

    expect(comp2.container).toBeDefined();
  });
});
