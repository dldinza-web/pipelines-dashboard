import React from 'react';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import FormTitle from 'src/components/shared/form-title';
import {
  gqlMutationAuthenticate,
  AuthenticatedUserType,
} from 'src/graphql/mutations/users.mutations';
import * as Styles from './styles/sign-in.styles';
import CryptoJS from 'crypto-js';
import { CURRENT_USER_LSTG_KEY } from '../../constants/sign-in.constants';
import ButtonsBox from 'src/components/shared/buttons-group';

const SignInForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errors, setErrors] = React.useState<string[]>([]);

  localStorage.removeItem(CURRENT_USER_LSTG_KEY);

  const onAuthenticationFailure = () => {
    setErrors(['API failed. Please contact Technical Support.']);
  };

  const onAuthenticationCompleted = (data: AuthenticatedUserType) => {
    if (data?.authenticateUser?.user) {
      localStorage.setItem(
        CURRENT_USER_LSTG_KEY,
        JSON.stringify(data.authenticateUser.user)
      );

      navigate('/projects_pipeline');
    }

    if (
      data?.authenticateUser?.errors &&
      data?.authenticateUser?.errors.includes('INVALID_AUTHENTICATION')
    ) {
      setErrors(['Invalid username or password']);
    }
  };

  const [gqlAuthenticate, gqlAuthenticateResponse] = useMutation(
    gqlMutationAuthenticate,
    {
      onCompleted: onAuthenticationCompleted,
      onError: onAuthenticationFailure,
    }
  );

  const onSubmit = () => {
    const encryptedTest = CryptoJS.SHA1(password).toString();

    gqlAuthenticate({ variables: { username, password: encryptedTest } });
  };

  return (
    <Paper elevation={1} sx={Styles.SignInBox}>
      <FormTitle>Sign In</FormTitle>

      {errors.length > 0 && (
        <Stack direction="column" spacing={2} sx={Styles.SignInFields}>
          {errors.map((msg, i) => (
            <Alert key={`error_${i}`} severity="error">
              {msg}
            </Alert>
          ))}
        </Stack>
      )}

      <Stack direction="column" spacing={2} sx={Styles.SignInFields}>
        <TextField
          id="edtUsername"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />

        <TextField
          id="edtPassword"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <ButtonsBox>
          <Button variant="contained" onClick={onSubmit}>
            Sign in
          </Button>
        </ButtonsBox>
      </Stack>

      <Backdrop sx={Styles.Overlay} open={gqlAuthenticateResponse.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default SignInForm;
