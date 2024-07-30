import { parseAccount } from '../../../accounts/utils/parseAccount.js';
import { AccountNotFoundError } from '../../../errors/account.js';
import { getAction } from '../../../utils/getAction.js';
import { getUserOperationError } from '../../utils/errors/getUserOperationError.js';
import { formatUserOperationRequest, } from '../../utils/formatters/userOperationRequest.js';
import { prepareUserOperation, } from './prepareUserOperation.js';
/**
 * Broadcasts a User Operation to the Bundler.
 *
 * - Docs: https://viem.sh/actions/bundler/sendUserOperation
 *
 * @param client - Client to use
 * @param parameters - {@link SendUserOperationParameters}
 * @returns The User Operation hash. {@link SendUserOperationReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { toSmartAccount } from 'viem/accounts'
 * import { sendUserOperation } from 'viem/actions'
 *
 * const account = await toSmartAccount({ ... })
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const values = await sendUserOperation(bundlerClient, {
 *   account,
 *   calls: [{ to: '0x...', value: parseEther('1') }],
 * })
 */
export async function sendUserOperation(client, parameters) {
    const { account: account_ = client.account } = parameters;
    if (!account_)
        throw new AccountNotFoundError();
    const account = parseAccount(account_);
    const request = await getAction(client, prepareUserOperation, 'prepareUserOperation')(parameters);
    const signature = parameters.signature ||
        (await account.signUserOperation(request));
    const rpcParameters = formatUserOperationRequest({
        ...request,
        signature,
    });
    try {
        return await client.request({
            method: 'eth_sendUserOperation',
            params: [rpcParameters, account.entryPoint.address],
        }, { retryCount: 0 });
    }
    catch (error) {
        throw getUserOperationError(error, {
            ...request,
            calls: parameters.calls,
            signature,
        });
    }
}
//# sourceMappingURL=sendUserOperation.js.map