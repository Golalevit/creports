export interface Action {
  type: string;
  payload: any;
}

export interface DataMasks {
  loadingMask?: string;
  errorMask?: string;
  dataMask?: string;
}

export interface Type {
  type: string;
}

export interface AsyncAction {
  done: any;
  started: any;
  failed: any;
}

export interface Axios {
  [key: string]: any;
}
