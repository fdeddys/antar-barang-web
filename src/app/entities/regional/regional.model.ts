
export class Regional {
    constructor(
        public id?: number,
        public nama ?: string,
        public status ?: number,
        public regionalGroupId?: number,
        public regionalGroupName?:string,
        public lastUpdateBy ?: string,
        public lastUpdate ?: string,
        public errCode?: string,
        public errDesc?: string,
    ) {
        this.id = 0,
        this.status =0
    }
}

export class RegionalPageDto {
    constructor(
        public totalRow?: number,
        public page?: number,
        public count?: number,
        public contents?: Regional[],
        public error?: string,
    ) {}
}
