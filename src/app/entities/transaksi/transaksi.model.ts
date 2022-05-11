export class Transaksi {
  constructor(
      public id?: number,
      public transaksiDate?: number,
      public transaksiDateStr?: string,
      public tanggalRequestAntar?: number,
      public tanggalRequestAntarStr?: string,
      public jamRequestAntar ?: string,
      public namaProduct ?: string,
      public coordinateTujuan ?: string,
      public keterangan ?: string,
      public photoAmbil?: string,
      public tanggalAmbil?: number,
      public jamAmbil?: string,
      public photoSampai?: string,
      public tanggalSampai?: number,
      public tanggalSampaiStr?: string,
      public idSeller?: number,
      public sellerName?: string,
      public idDriver?: number,
      public driverName?: string,
      public idCustomer?: number,
      public customerName?: string,
      public idAdmin?: number,
      public lastUpdate?: number,
      public lastUpdateBy ?: string,
      public lastUpdateStr ?: string,
      public status ?: number,

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
