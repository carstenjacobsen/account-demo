use soroban_sdk::{
    contracttype, String
};

#[derive(Debug, Clone)]
#[contracttype]
pub struct User {
    pub name: String,
    pub user_id: String,
}