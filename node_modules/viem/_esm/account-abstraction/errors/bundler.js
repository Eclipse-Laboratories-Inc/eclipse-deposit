import { BaseError } from '../../errors/base.js';
export class AccountNotDeployedError extends BaseError {
    constructor({ cause, }) {
        super('Smart Account is not deployed.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- No `factory`/`factoryData` or `initCode` properties are provided for Smart Account deployment.',
                '- An incorrect `sender` address is provided.',
            ],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AccountNotDeployedError'
        });
    }
}
Object.defineProperty(AccountNotDeployedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa20/
});
export class ExecutionRevertedError extends BaseError {
    constructor({ cause, message, } = {}) {
        const reason = message
            ?.replace('execution reverted: ', '')
            ?.replace('execution reverted', '');
        super(`Execution reverted ${reason ? `with reason: ${reason}` : 'for an unknown reason'}.`, {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ExecutionRevertedError'
        });
    }
}
Object.defineProperty(ExecutionRevertedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32521
});
Object.defineProperty(ExecutionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /execution reverted/
});
export class FailedToSendToBeneficiaryError extends BaseError {
    constructor({ cause, }) {
        super('Failed to send funds to beneficiary.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'FailedToSendToBeneficiaryError'
        });
    }
}
Object.defineProperty(FailedToSendToBeneficiaryError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa91/
});
export class GasValuesOverflowError extends BaseError {
    constructor({ cause, }) {
        super('Gas value overflowed.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- one of the gas values exceeded 2**120 (uint120)',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'GasValuesOverflowError'
        });
    }
}
Object.defineProperty(GasValuesOverflowError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa94/
});
export class HandleOpsOutOfGasError extends BaseError {
    constructor({ cause, }) {
        super('The `handleOps` function was called by the Bundler with a gas limit too low.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'HandleOpsOutOfGasError'
        });
    }
}
Object.defineProperty(HandleOpsOutOfGasError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa95/
});
export class InitCodeFailedError extends BaseError {
    constructor({ cause, factory, factoryData, initCode, }) {
        super('Failed to simulate deployment for Smart Account.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- Invalid `factory`/`factoryData` or `initCode` properties are present',
                '- Smart Account deployment execution ran out of gas (low `verificationGasLimit` value)',
                '- Smart Account deployment execution reverted with an error\n',
                factory && `factory: ${factory}`,
                factoryData && `factoryData: ${factoryData}`,
                initCode && `initCode: ${initCode}`,
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InitCodeFailedError'
        });
    }
}
Object.defineProperty(InitCodeFailedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa13/
});
export class InitCodeMustCreateSenderError extends BaseError {
    constructor({ cause, factory, factoryData, initCode, }) {
        super('Smart Account initialization implementation did not create an account.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- `factory`/`factoryData` or `initCode` properties are invalid',
                '- Smart Account initialization implementation is incorrect\n',
                factory && `factory: ${factory}`,
                factoryData && `factoryData: ${factoryData}`,
                initCode && `initCode: ${initCode}`,
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InitCodeMustCreateSenderError'
        });
    }
}
Object.defineProperty(InitCodeMustCreateSenderError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa15/
});
export class InitCodeMustReturnSenderError extends BaseError {
    constructor({ cause, factory, factoryData, initCode, sender, }) {
        super('Smart Account initialization implementation does not return the expected sender.', {
            cause,
            metaMessages: [
                'This could arise when:',
                'Smart Account initialization implementation does not return a sender address\n',
                factory && `factory: ${factory}`,
                factoryData && `factoryData: ${factoryData}`,
                initCode && `initCode: ${initCode}`,
                sender && `sender: ${sender}`,
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InitCodeMustReturnSenderError'
        });
    }
}
Object.defineProperty(InitCodeMustReturnSenderError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa14/
});
export class InsufficientPrefundError extends BaseError {
    constructor({ cause, }) {
        super('Smart Account does not have sufficient funds to execute the User Operation.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the Smart Account does not have sufficient funds to cover the required prefund, or',
                '- a Paymaster was not provided',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InsufficientPrefundError'
        });
    }
}
Object.defineProperty(InsufficientPrefundError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa21/
});
export class InternalCallOnlyError extends BaseError {
    constructor({ cause, }) {
        super('Bundler attempted to call an invalid function on the EntryPoint.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InternalCallOnlyError'
        });
    }
}
Object.defineProperty(InternalCallOnlyError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa92/
});
export class InvalidAggregatorError extends BaseError {
    constructor({ cause, }) {
        super('Bundler used an invalid aggregator for handling aggregated User Operations.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InvalidAggregatorError'
        });
    }
}
Object.defineProperty(InvalidAggregatorError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa96/
});
export class InvalidAccountNonceError extends BaseError {
    constructor({ cause, nonce, }) {
        super('Invalid Smart Account nonce used for User Operation.', {
            cause,
            metaMessages: [nonce && `nonce: ${nonce}`].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InvalidAccountNonceError'
        });
    }
}
Object.defineProperty(InvalidAccountNonceError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa25/
});
export class InvalidBeneficiaryError extends BaseError {
    constructor({ cause, }) {
        super('Bundler has not set a beneficiary address.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InvalidBeneficiaryError'
        });
    }
}
Object.defineProperty(InvalidBeneficiaryError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa90/
});
export class InvalidFieldsError extends BaseError {
    constructor({ cause, }) {
        super('Invalid fields set on User Operation.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InvalidFieldsError'
        });
    }
}
Object.defineProperty(InvalidFieldsError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
});
export class InvalidPaymasterAndDataError extends BaseError {
    constructor({ cause, paymasterAndData, }) {
        super('Paymaster properties provided are invalid.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `paymasterAndData` property is of an incorrect length\n',
                paymasterAndData && `paymasterAndData: ${paymasterAndData}`,
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'InvalidPaymasterAndDataError'
        });
    }
}
Object.defineProperty(InvalidPaymasterAndDataError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa93/
});
export class PaymasterDepositTooLowError extends BaseError {
    constructor({ cause, }) {
        super('Paymaster deposit for the User Operation is too low.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the Paymaster has deposited less than the expected amount via the `deposit` function',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'PaymasterDepositTooLowError'
        });
    }
}
Object.defineProperty(PaymasterDepositTooLowError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32508
});
Object.defineProperty(PaymasterDepositTooLowError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa31/
});
export class PaymasterFunctionRevertedError extends BaseError {
    constructor({ cause, }) {
        super('The `validatePaymasterUserOp` function on the Paymaster reverted.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'PaymasterFunctionRevertedError'
        });
    }
}
Object.defineProperty(PaymasterFunctionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa33/
});
export class PaymasterNotDeployedError extends BaseError {
    constructor({ cause, }) {
        super('The Paymaster contract has not been deployed.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'PaymasterNotDeployedError'
        });
    }
}
Object.defineProperty(PaymasterNotDeployedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa30/
});
export class PaymasterRateLimitError extends BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'PaymasterRateLimitError'
        });
    }
}
Object.defineProperty(PaymasterRateLimitError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32504
});
export class PaymasterStakeTooLowError extends BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'PaymasterStakeTooLowError'
        });
    }
}
Object.defineProperty(PaymasterStakeTooLowError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32505
});
export class PaymasterPostOpFunctionRevertedError extends BaseError {
    constructor({ cause, }) {
        super('Paymaster `postOp` function reverted.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'PaymasterPostOpFunctionRevertedError'
        });
    }
}
Object.defineProperty(PaymasterPostOpFunctionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa50/
});
export class SenderAlreadyConstructedError extends BaseError {
    constructor({ cause, factory, factoryData, initCode, }) {
        super('Smart Account has already been deployed.', {
            cause,
            metaMessages: [
                'Remove the following properties and try again:',
                factory && '`factory`',
                factoryData && '`factoryData`',
                initCode && '`initCode`',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SenderAlreadyConstructedError'
        });
    }
}
Object.defineProperty(SenderAlreadyConstructedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa10/
});
export class SignatureCheckFailedError extends BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because account signature check failed (or paymaster signature, if the paymaster uses its data as signature).', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SignatureCheckFailedError'
        });
    }
}
Object.defineProperty(SignatureCheckFailedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32507
});
export class SmartAccountFunctionRevertedError extends BaseError {
    constructor({ cause, }) {
        super('The `validateUserOp` function on the Smart Account reverted.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SmartAccountFunctionRevertedError'
        });
    }
}
Object.defineProperty(SmartAccountFunctionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa23/
});
export class UnsupportedSignatureAggregatorError extends BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because account specified unsupported signature aggregator.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UnsupportedSignatureAggregatorError'
        });
    }
}
Object.defineProperty(UnsupportedSignatureAggregatorError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32506
});
export class UserOperationExpiredError extends BaseError {
    constructor({ cause, }) {
        super('User Operation expired.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `validAfter` or `validUntil` values returned from `validateUserOp` on the Smart Account are not satisfied',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationExpiredError'
        });
    }
}
Object.defineProperty(UserOperationExpiredError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa22/
});
export class UserOperationPaymasterExpiredError extends BaseError {
    constructor({ cause, }) {
        super('Paymaster for User Operation expired.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `validAfter` or `validUntil` values returned from `validatePaymasterUserOp` on the Paymaster are not satisfied',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationPaymasterExpiredError'
        });
    }
}
Object.defineProperty(UserOperationPaymasterExpiredError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa32/
});
export class UserOperationSignatureError extends BaseError {
    constructor({ cause, }) {
        super('Signature provided for the User Operation is invalid.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Smart Account',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationSignatureError'
        });
    }
}
Object.defineProperty(UserOperationSignatureError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa24/
});
export class UserOperationPaymasterSignatureError extends BaseError {
    constructor({ cause, }) {
        super('Signature provided for the User Operation is invalid.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Paymaster',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationPaymasterSignatureError'
        });
    }
}
Object.defineProperty(UserOperationPaymasterSignatureError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa34/
});
export class UserOperationRejectedByEntryPointError extends BaseError {
    constructor({ cause }) {
        super("User Operation rejected by EntryPoint's `simulateValidation` during account creation or validation.", {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationRejectedByEntryPointError'
        });
    }
}
Object.defineProperty(UserOperationRejectedByEntryPointError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32500
});
export class UserOperationRejectedByPaymasterError extends BaseError {
    constructor({ cause }) {
        super("User Operation rejected by Paymaster's `validatePaymasterUserOp`.", {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationRejectedByPaymasterError'
        });
    }
}
Object.defineProperty(UserOperationRejectedByPaymasterError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32501
});
export class UserOperationRejectedByOpCodeError extends BaseError {
    constructor({ cause }) {
        super('User Operation rejected with op code validation error.', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationRejectedByOpCodeError'
        });
    }
}
Object.defineProperty(UserOperationRejectedByOpCodeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32502
});
export class UserOperationOutOfTimeRangeError extends BaseError {
    constructor({ cause }) {
        super('UserOperation out of time-range: either wallet or paymaster returned a time-range, and it is already expired (or will expire soon).', {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UserOperationOutOfTimeRangeError'
        });
    }
}
Object.defineProperty(UserOperationOutOfTimeRangeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32503
});
export class UnknownBundlerError extends BaseError {
    constructor({ cause }) {
        super(`An error occurred while executing user operation: ${cause?.shortMessage}`, {
            cause,
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'UnknownBundlerError'
        });
    }
}
export class VerificationGasLimitExceededError extends BaseError {
    constructor({ cause, }) {
        super('User Operation verification gas limit exceeded.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the gas used for verification exceeded the `verificationGasLimit`',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'VerificationGasLimitExceededError'
        });
    }
}
Object.defineProperty(VerificationGasLimitExceededError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa40/
});
export class VerificationGasLimitTooLowError extends BaseError {
    constructor({ cause, }) {
        super('User Operation verification gas limit is too low.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `verificationGasLimit` is too low to verify the User Operation',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'VerificationGasLimitTooLowError'
        });
    }
}
Object.defineProperty(VerificationGasLimitTooLowError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa41/
});
//# sourceMappingURL=bundler.js.map