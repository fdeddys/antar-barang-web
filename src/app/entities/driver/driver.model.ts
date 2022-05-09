
export class Driver {
    constructor(
        public id?: number,
        public kode?: string,
        public photo?: string,
        public alamat ?: string,
        public hp ?: string,
        public nama ?: string,
        public status ?: number,
        public lastUpdateBy ?: string,
        public lastUpdateStr ?: string,
        public errCode?: string,
        public errDesc?: string,
    ) {
        this.id = 0,
        this.status =0
    }
}

export class DriverPageDto {
    constructor(
        public totalRow?: number,
        public page?: number,
        public count?: number,
        public contents?: Driver[],
        public error?: string,
    ) {}
}
