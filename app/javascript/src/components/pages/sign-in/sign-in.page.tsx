import React from 'react';
import AppLayout from 'src/components/layout/app.layout';
import SignInForm from './components/form/sign-in.form';

const SignInPage = () => {
  return (
    <AppLayout title="Projects Pipeline">
      <SignInForm />
    </AppLayout>
  );
};

export default SignInPage;
