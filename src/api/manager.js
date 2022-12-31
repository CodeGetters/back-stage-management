import service from "@/axios.js";

export function login(username, password) {
    return service.post('/login', {
        username,
        password
    })
}

export function getInfo() {
    return service.post('/getinfo')
}