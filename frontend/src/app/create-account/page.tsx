'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Link from "next/link";
import { account, server } from "../utils/passkey-kit";
import {useKeyIdStore} from '../store/keyId';
import {useContractIdStore} from '../store/contractId';
import {useUserNameStore} from '../store/userName';
import { redirect } from 'next/navigation'
import { accountClient } from "../utils/accounts"
import Header from "../components/Header"

export default function Login() {
    const [creating, setCreating] = useState(false);

    const contractId = useContractIdStore((state) => state.contractId);
    const updateContractId = useContractIdStore((state) => state.setContractId);
    const updateKeyId = useKeyIdStore((state) => state.setKeyId);
    const updateUserName = useUserNameStore((state) => state.setUserName);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);   
        let username = formData.get('username') as string;
    
        setCreating(true);

        try {

            const { 
                keyIdBase64,
                contractId: cid,
                signedTx,
            } = await account.createWallet("Account Demo", "Account Demo");

            await server.send(signedTx);

            let at = await accountClient.create_user({name: username, user_id: cid});
            at = await account.sign(at, { keyId: keyIdBase64 });
            await server.send(at);

            updateKeyId(keyIdBase64);
            updateContractId(cid);
            updateUserName(username);

        } catch (error) {
            console.error("An error occurred:", error);    
        } finally {
            setCreating(false);
            redirect('/');
        }
    }

    return (
        <>
            <Header />
            <div className="grid grid-rows-[0px_1fr_0px] items-center justify-items-center min-h-screen pb-50 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <div>
                        <div className="w-full max-w-xs">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" type="submit" disabled={creating}>
                                        Creat{creating ? "ing..." : "e"}
                                    </button>
                                    <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>  
                    </div>
                </main>
            </div>
        </>
    )
}