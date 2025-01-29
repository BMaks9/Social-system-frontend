/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetDisabylities {
  /** ID */
  id?: number;
  /**
   * Phone
   * @maxLength 20
   */
  phone?: string;
  /**
   * Address
   * @maxLength 100
   */
  address?: string;
  /** Status */
  status: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Data created
   * @format date-time
   */
  data_created: string;
  /**
   * Data compilation
   * @format date-time
   */
  data_compilation?: string | null;
  /**
   * Data finished
   * @format date-time
   */
  data_finished?: string | null;
  /**
   * Date dilivery
   * @format date
   */
  date_dilivery?: string | null;
  /**
   * Creator
   * @minLength 1
   */
  creator?: string;
  /**
   * Moderator
   * @pattern ^[\w.@+-]+$
   */
  moderator?: string | null;
}

export interface GetDisabilitiesPatronage {
  /** ID */
  id?: number;
  /** Disabilities id */
  disabilities_id: number;
  /** Patronage id */
  patronage_id: number;
  /** Comment */
  comment?: string | null;
}

export interface GetDisabilityDetail {
  /** ID */
  id?: number;
  /**
   * Phone
   * @maxLength 20
   */
  phone?: string;
  /**
   * Address
   * @maxLength 100
   */
  address?: string;
  /** Status */
  status: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Data created
   * @format date-time
   */
  data_created: string;
  /**
   * Data compilation
   * @format date-time
   */
  data_compilation?: string | null;
  /**
   * Data finished
   * @format date-time
   */
  data_finished?: string | null;
  /**
   * Date dilivery
   * @format date
   */
  date_dilivery?: string | null;
  /** Patronages */
  patronages?: GetPatronages[];
}

export interface User {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
}

export interface GetPatronages {
  /** ID */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 30
   */
  title: string;
  /**
   * Img
   * @maxLength 100
   */
  img?: string;

  current_count?: number;

}

export interface GetPatronagesDetail {
  /** ID */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 30
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Img
   * @maxLength 100
   */
  img?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";
// import { Patronage } from "../modules/SocialServiceApi";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://192.168.56.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://192.168.56.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  disabilities = {
    /**
     * @description Retrieve a list of disabilities based on optional filters for status and data_compilation.
     *
     * @tags disabilities
     * @name DisabilitiesList
     * @request GET:/disabilities/
     * @secure
     */
    disabilitiesList: (
      query?: {
        /** Filter by status of the disability (e.g. 'approved', 'pending'). */
        status?: string;
        /**
         * Filter by the date of compilation of the disability request.
         * @format date
         */
        data_compilation?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetDisabylities[], void>({
        path: `/disabilities/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the association between a disability and a patronage.
     *
     * @tags disabilities
     * @name DisabilitiesPatronageUpdate
     * @request PUT:/disabilities/{disabilityId}/patronage/{patronageId}/
     * @secure
     */
    disabilitiesPatronageUpdate: (
      disabilityId: string,
      patronageId: string,
      data: GetDisabilitiesPatronage,
      params: RequestParams = {},
    ) =>
      this.request<GetDisabilitiesPatronage, void>({
        path: `/disabilities/${disabilityId}/patronage/${patronageId}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete the association between a disability and a patronage.
     *
     * @tags disabilities
     * @name DisabilitiesPatronageDelete
     * @request DELETE:/disabilities/{disabilityId}/patronage/{patronageId}/
     * @secure
     */
    disabilitiesPatronageDelete: (disabilityId: string, patronageId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/disabilities/${disabilityId}/patronage/${patronageId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Retrieve a specific disability request details by ID.
     *
     * @tags disabilities
     * @name DisabilitiesRead
     * @request GET:/disabilities/{id}/
     * @secure
     */
    disabilitiesRead: (id: string, params: RequestParams = {}) =>
      this.request<GetDisabilityDetail, void>({
        path: `/disabilities/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a specific disability request (only 'draft' status can be updated).
     *
     * @tags disabilities
     * @name DisabilitiesUpdate
     * @request PUT:/disabilities/{id}/
     * @secure
     */
    disabilitiesUpdate: (id: string, data: GetDisabilityDetail, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/disabilities/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Soft delete a specific disability request (marks it as 'deleted').
     *
     * @tags disabilities
     * @name DisabilitiesDelete
     * @request DELETE:/disabilities/{id}/
     * @secure
     */
    disabilitiesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/disabilities/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Complete or reject a disability request. Based on the action parameter, update the status to 'completed' or 'rejected'.
     *
     * @tags disabilities
     * @name DisabilitiesCompleteUpdate
     * @request PUT:/disabilities/{id}/complete/
     * @secure
     */
    disabilitiesCompleteUpdate: (
      id: string,
      data: GetDisabylities,
      query?: {
        /** Action to perform, either 'completed' or 'rejected'. */
        action?: "completed" | "rejected";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetDisabylities, void>({
        path: `/disabilities/${id}/complete/`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Submit a disability request, updating its status to 'formed' and setting the data_compilation date.
     *
     * @tags disabilities
     * @name DisabilitiesSubmitUpdate
     * @request PUT:/disabilities/{id}/submit/
     * @secure
     */
    disabilitiesSubmitUpdate: (id: string, data: GetDisabylities, params: RequestParams = {}) =>
      this.request<GetDisabylities, void>({
        path: `/disabilities/${id}/submit/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  patronages = {
    /**
     * @description Get a list of patronages
     *
     * @tags patronages
     * @name PatronagesList
     * @request GET:/patronages/
     * @secure
     */
    patronagesList: (
      query?: {
        /** Optionally filter by name of patronage */
        patronageName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPatronages[], any>({
        path: `/patronages/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Add new patronage (moderators only).
     *
     * @tags patronages
     * @name PatronagesCreate
     * @request POST:/patronages/
     * @secure
     */
    patronagesCreate: (data: GetPatronagesDetail, params: RequestParams = {}) =>
      this.request<GetPatronagesDetail, void>({
        path: `/patronages/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information about patronage
     *
     * @tags patronages
     * @name PatronagesRead
     * @request GET:/patronages/{id}/
     * @secure
     */
    patronagesRead: (id: number, params: RequestParams = {}) =>
      this.request<GetPatronagesDetail, void>({
        path: `/patronages/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update information about patronage (moderators only).
     *
     * @tags patronages
     * @name PatronagesUpdate
     * @request PUT:/patronages/{id}/
     * @secure
     */
    patronagesUpdate: (id: number, params: RequestParams = {}) =>
      this.request<GetPatronagesDetail, void>({
        path: `/patronages/${id}/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a patronage by Id (moderators only).
     *
     * @tags patronages
     * @name PatronagesDelete
     * @request DELETE:/patronages/{id}/
     * @secure
     */
    patronagesDelete: ( id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/patronages/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Create or update a patronage request for a disability
     *
     * @tags patronages
     * @name PatronagesDraftCreate
     * @request POST:/patronages/{id}/draft/
     * @secure
     */
    patronagesDraftCreate: (id: number, data: GetDisabilitiesPatronage, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/patronages/${id}/draft/`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Update patronage image (logo) for a specific patronage
     *
     * @tags patronages
     * @name PatronagesImageCreate
     * @request POST:/patronages/{id}/image/
     * @secure
     */
    patronagesImageCreate: ( id: number, data: GetPatronages, params: RequestParams = {}) =>
      this.request<GetPatronages, void>({
        path: `/patronages/${id}/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRead
     * @request GET:/users/{id}/
     * @secure
     */
    usersRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{id}/
     * @secure
     */
    usersUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersPartialUpdate
     * @request PATCH:/users/{id}/
     * @secure
     */
    usersPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersDelete
     * @request DELETE:/users/{id}/
     * @secure
     */
    usersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
