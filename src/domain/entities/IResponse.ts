export enum ResponseType {
  SUCCESS,
  ERROR
};

export interface IResponse {
  title: string,
  description: string,
  value: object | undefined,
  type: ResponseType
}
