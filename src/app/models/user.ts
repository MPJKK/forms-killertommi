export class User { // luotiin luokka user models kansioon ng g class models/user
    constructor(public username: string,
                public password: string,
                public email: string,
                public full_name?: string) {
    }
}
