type UserData = {
    userID: string,
    firstName: string,
    lastName: string,
    login: string,
    phone: number,
    website: string | null,
    role: string
}

type LoginData = {
    login: string,
    password: string
}

type LoginResponse = {
    user: UserData,
    token: string

}

export { UserData, LoginData, LoginResponse };