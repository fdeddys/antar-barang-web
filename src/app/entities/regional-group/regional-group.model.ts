
export class RegionalGroup {
    constructor(
        public id?: number,
        public nama ?: string,
        public status ?: number,
        public lastUpdateBy ?: string,
        public lastUpdate ?: string,
        public errCode?: string,
        public errDesc?: string,
    ) {
        this.id = 0,
        this.status =0
    }
}

export class RegionalGroupPageDto {
    constructor(
        public totalRow?: number,
        public page?: number,
        public count?: number,
        public contents?: RegionalGroup[],
        public error?: string,
    ) {}
}
