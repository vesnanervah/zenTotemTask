type User = {
    userID: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string, // только в тестовых целях, в реале должен быть хеш и дб
    phone: number,
    website: string | null
}

export { User };