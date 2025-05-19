#![no_std]
use soroban_sdk::{
    contract, contractimpl, Env, String
};

mod types;
use types::{User};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn create_user(env: Env, name: String, user_id: String) -> User {
        let user = User {
            name,
            user_id: user_id.clone(),
        };

        env.storage().persistent().set(&user_id.clone(), &user);

        user
    }

    pub fn get_user(env: Env, user_id: String) -> User {
        env.storage().persistent().get(&user_id).unwrap()
    }
}

