
export class Transaksi {
  constructor(
      public id?: number,
      public kode?: string,
      public password?: string,
      public nama ?: string,
      public hp ?: string,
      public alamat ?: string,
      public status ?: number,
      public last_update_by ?: string,
      public last_update_str ?: string,
      public errCode?: string,
      public errDesc?: string,
  ) {
      this.id = 0
  }
}

export class TransaksiPageDto {
  constructor(
      public totalRow?: number,
      public page?: number,
      public count?: number,
      public contents?: Transaksi[],
      public error?: string,
  ) {}
}
