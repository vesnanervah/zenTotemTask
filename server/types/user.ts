type User = {
    userID: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string, // хешится в sha256
    phone: number,
    website: string | null,
    role: string
}

export { User };