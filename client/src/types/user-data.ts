type UserData = {
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    website: string | null,
    role: string
}

type LoginData = {
    email: string,
    password: string
}

type LoginResponse = {
    user: UserData,
    token: string

}

export { UserData, LoginData, LoginResponse };