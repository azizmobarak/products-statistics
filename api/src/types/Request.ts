import { Request } from "express";

export interface analyticsTotalRequest { start_date: string; end_date: string }

export type IRequestBody<T> = Request<{}, {}, T>;
export type IRequestParams<T> = Request<{}, T, {}>;
export type IRequest<P,T> = Request<{}, P, T>;