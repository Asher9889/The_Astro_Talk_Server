interface IUser {
    fullName: string;
    email: string;
    phone: number;
    password: string
}

interface ILoginUser {
    email: string;
    password: string;
}

export { IUser, ILoginUser };