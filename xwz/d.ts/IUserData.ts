interface IUserData {
    id: string,
    roleCode: string,
    nickName: string,
    sex?: string,
    isAdmin?: boolean,
    isLogin?: boolean,
    avatar: string,
    identityIcon?:string
}


interface IUserDataMap {
    [key: string]: IUserData
}