import service from "@/axios.js";

export function login(username, password) {
    return service.post('/login', {
        username,
        password
    })
}
