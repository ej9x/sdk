import * as React from 'react';
import { AuthClient } from '@8base/utils';
import { ApolloContainer } from './ApolloContainer';
import { ApolloContainerPassedProps } from './types';

const { AuthProvider }  = require('@8base/auth');
const { TableSchemaProvider } = require('@8base/table-schema-provider');


type EightBaseAppProviderProps = ApolloContainerPassedProps & { 
  authClient?: AuthClient,
  children: (renderProps: { loading: boolean }) => React.ReactNode,
}

/**
 * `EightBaseAppProvider` universal provider which loads fragments schema and provides Apollo client with it, authentication and table schema.
 * @prop {string} [uri] - The 8base API field schema.
 * @prop {Object} [authClient] - The 8base auth client.
 * @prop {Function} [onRequestSuccess] - The callback which called when request is success.
 * @prop {Function} [onRequestError] - The callback which called when request is fail.
 * @prop {Function} [extendLinks] - Function to extend standart array of the links.
 * @prop {Function} [children] - The render function.
 */
const EightBaseAppProvider = ({
  uri,
  authClient,
  onRequestSuccess,
  onRequestError,
  extendLinks,
  children,
}: EightBaseAppProviderProps): any =>
  !!authClient
    ? (
      <AuthProvider authClient={ authClient }>
        <ApolloContainer
          withAuth
          uri={ uri }
          extendLinks={ extendLinks }
          onRequestSuccess={ onRequestSuccess }
          onRequestError={ onRequestError }
        >
          <TableSchemaProvider>
            { children }
          </TableSchemaProvider>
        </ApolloContainer>
      </AuthProvider>
    ) : (
      <ApolloContainer
        withAuth={ false }
        uri={ uri }
        extendLinks={ extendLinks }
        onRequestSuccess={ onRequestSuccess }
        onRequestError={ onRequestError }
      >
        <TableSchemaProvider>
          { children }
        </TableSchemaProvider>
      </ApolloContainer>
    );

export { EightBaseAppProvider };
