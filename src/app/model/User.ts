export class User{
    constructor(
        public username,
        private _token
    ){ }

    get token(){
        return this._token;
    }
}