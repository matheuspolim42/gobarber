import React from 'react';
import GlobalStyle from './styles';
import { HookExecuter } from './hooks';
import AppRoutes from './routes';

function App() {
  return (
    <>
        <HookExecuter>
          <AppRoutes />
        </HookExecuter>

        <GlobalStyle/>
    </>
  )
}

export default App;
