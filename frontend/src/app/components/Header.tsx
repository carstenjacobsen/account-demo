import Link from "next/link";
import {useKeyIdStore} from '../store/keyId';
import {useContractIdStore} from '../store/contractId';
import {useUserNameStore} from '../store/userName';
import { truncate } from "../utils/base";
import { account } from "../utils/passkey-kit";
import { accountClient } from "../utils/accounts"


export default function Header() {
    
    const userName = useUserNameStore((state) => state.userName)
    const updateUserName = useUserNameStore((state) => state.setUserName);

    const contractId = useContractIdStore((state) => state.contractId)
    const updateContractId = useContractIdStore((state) => state.setContractId)

    //const keyId = useKeyIdStore((state) => state.keyId)
    const updateKeyId = useKeyIdStore((state) => state.setKeyId)

    function logout() {

        updateUserName('');
        updateContractId('');
        updateKeyId('');
    }
   
    async function login() {
        
        try {
        const { keyIdBase64, contractId: cid } = await account.connectWallet();

        updateKeyId(keyIdBase64)
        updateContractId(cid);

        let {result} = await accountClient.get_user({user_id: cid});
        updateUserName(result.name);
        console.log({login: result});
        } catch (error) {
            alert('Login Failed...');   
        } finally {

        }
    }
    

    return (
        <nav className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                <div className="flex space-x-4">
                    <div className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                    
                        <span className="font-bold">Account Demo</span>
                   
                    </div>


                </div>

                <div className="hidden md:flex items-center space-x-1">
                    {userName == "" ? (
                        <>
                            <Link href="#" onClick={login} className="py-5 px-3">Login</Link>
                            <Link href="/create-account" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link>
                        </>
                    ) : (
                        <div>
                            <>
                                {userName}  <Link href={"https://stellar.expert/explorer/testnet/contract/" + contractId}>({truncate(contractId, 4)})</Link>
                            </>
                        <Link href="#" onClick={logout} className="py-5 px-3">Logout</Link>
                        </div>
                    )}
                    
                </div>

                <div className="md:hidden flex items-center">
                    <button className="mobile-menu-button">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>

                </div>
            </div>

            
            </nav>
    )
}



