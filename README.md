# Lil-Paws-Server

NodeJS backend for Lil' Paws

---

## Authorization Scheme

1. Authorization *Bearer* header with JWT payload

---

## Express Middleware routes

1. `/accounts`
2. `/pets`

---

## Mongoose Schemas

### 1. Account

```js
{
    _id: String!, // Username
    email: String!, // Unique
    password: String,
    date: Date!
}
```

### 2. Pet

```js
{
    variant: String!,
    breed: String!,
    name: String!,
    age: Number!,
    owner: String!, // Account _id
}
```