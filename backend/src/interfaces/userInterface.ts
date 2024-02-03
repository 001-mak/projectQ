export interface appUser {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    roleId: number,
    emailVerified: boolean,
    verificationToken?: string,
    resetPasswordToken?: string,
    isAdmin: boolean,
    userType: string,
    createdOn?: Date,
    updatedOn?: Date,
    createdBy?: string,
    updatedBy?: string
}