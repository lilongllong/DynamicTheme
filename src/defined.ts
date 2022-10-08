// eslint-disable-next-line no-unused-vars
import { AxiosResponse } from 'axios';

export interface IndustryRes<T> {
  code: number;
  message: string;
  data: T;
}
export type Res<T> = Promise<AxiosResponse<IndustryRes<T>>>;


export enum ChannelType {
  'api',
  'h5',
  'mini',
  'wecom_suite' = 'wecom_suite',
}
