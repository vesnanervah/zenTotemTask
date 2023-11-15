type UserData = {
    userID: string,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
    phone: number,
    website: string | undefined
}

type LoginData = {
    login: string,
    password: string
}

export { UserData, LoginData };