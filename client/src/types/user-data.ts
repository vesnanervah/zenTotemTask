type UserData = {
    userID: number,
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

type UpdateData = {
    userID: number,
    name: string,
    value: string
}

export { UserData, LoginData, LoginResponse, UpdateData };