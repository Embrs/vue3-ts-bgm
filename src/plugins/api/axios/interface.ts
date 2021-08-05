export interface AnyObject {
  [key: string]: any;
}
export interface ResObject {
  data: any;
  status: {
    code: string;
    details: Array<string>;
    emessage: string;
    err: number;
    i18nMsg: string;
    message: string;
    time?: string;
    traceID?: string;
    unix?: number;
  };
}
