import { User } from "../@types/user";

export const Users: User[] = [
    {
        username: "admin",
        password: "admin",
        nickname: "admin",
        realname: "Admin",
        admin: true
    },
    {
        username: "john_doe",
        password: "john",
        nickname: "john",
        realname: "John Doe",
        admin: false
    },
    {
        username: "jane_smith",
        password: "jane",
        nickname: "jane",
        realname: "Jane Smith",
        admin: false
    },
    {
        username: "alex_wong",
        password: "alex",
        nickname: "alex",
        realname: "Alex Wong",
        admin: false
    }
];
