import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CD2U22POAI4CDHRYRM3Q3TBG6VXPYIE3IEJKWCSAQJSQUFQZYHP5GGNQ",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initalizing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAABFVzZXIAAAACAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAHdXNlcl9pZAAAAAAQ",
            "AAAAAAAAAAAAAAALY3JlYXRlX3VzZXIAAAAAAgAAAAAAAAAEbmFtZQAAABAAAAAAAAAAB3VzZXJfaWQAAAAAEAAAAAEAAAfQAAAABFVzZXI=",
            "AAAAAAAAAAAAAAAIZ2V0X3VzZXIAAAABAAAAAAAAAAd1c2VyX2lkAAAAABAAAAABAAAH0AAAAARVc2Vy"]), options);
        this.options = options;
    }
    fromJSON = {
        create_user: (this.txFromJSON),
        get_user: (this.txFromJSON)
    };
}
