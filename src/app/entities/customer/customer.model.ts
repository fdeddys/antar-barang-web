export class Customer {
    constructor(
        public id?: number,
        public sellerId?: number,
        public sellerName?:string,
        public nama?: string,
        public hp ?:string,
        public alamat ?: string,
        public coordinate ?: string,
        public status ?: number,
        public errCode?: string,
        public errDesc?: string,
        public regionalId?: number,
        public regionalName?: string,
        public lng?: string,
        public lat?: string,
    ) {
        this.id = 0,
        this.status = 10,
        this.lng = "0",
        this.lat = "0"
    }
}

export class CustomerPageDto {
    constructor(
        public totalRow?: number,
        public page?: number,
        public count?: number,
        public contents?: Customer[],
        public error?: string,
    ) {}
}
