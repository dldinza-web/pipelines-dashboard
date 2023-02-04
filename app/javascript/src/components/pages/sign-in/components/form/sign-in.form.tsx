import React from 'react';
import {
  Alert,
  Backdrop,
  Box,
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
import * as CommonStyles from 'src/components/shared/styles/common';

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
    <Box>
      <Paper elevation={1} sx={Styles.SignInBox}>
        <FormTitle>Sign In</FormTitle>

        {errors.length > 0 && (
          <Stack
            direction="column"
            spacing={2}
            sx={Styles.SignInFields}
            data-test-id="messages-box"
          >
            {errors.map((msg, i) => (
              <Alert key={`error_${i}`} severity="error" className="msg-error">
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
            <Button
              data-test-id="btnSignIn"
              variant="contained"
              onClick={onSubmit}
            >
              Sign in
            </Button>
          </ButtonsBox>
        </Stack>

        <Backdrop
          sx={CommonStyles.Overlay}
          open={gqlAuthenticateResponse.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>

      <Paper elevation={1} sx={Styles.Notes}>
        <FormTitle>Notes:</FormTitle>

        <p>
          There are 3 accounts created by default for testing purpose. They are
          the following.
        </p>

        <ul>
          <li>ryan@testing.com</li>
          <li>dennys@testing.com</li>
          <li>david@testing.com</li>
        </ul>

        <p>The default password is "123abc"</p>

        <p>
          If invalid username or password is provided the GraphQL API does not
          authenticate and notification message is displayed.
        </p>
      </Paper>
    </Box>
  );
};

export default SignInForm;
