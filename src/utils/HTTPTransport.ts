enum Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

type Options = {
  method?: Methods;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
};

type HTTPMethod = <R = unknown>(
  url: string,
  options?: Partial<Options>,
) => Promise<R>;

function queryStringify(data: Record<string, unknown>) {
  const queries: string[] = [];

  for (const key in data) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(String(data[key]));
    queries.push(`${encodedKey}=${encodedValue}`);
  }

  return queries.length ? `?${queries.join("&")}` : "";
}

export class HTTPTransport {
  public get = this.createMethod(Methods.GET);
  public patch = this.createMethod(Methods.PATCH);
  public put = this.createMethod(Methods.PUT);
  public post = this.createMethod(Methods.POST);
  public delete = this.createMethod(Methods.DELETE);

  private createMethod(method: Methods): HTTPMethod {
    return (url, options = {}) => this.request(url, { ...options, method });
  }

  private request = <R>(url: string, options: Options): Promise<R> => {
    return new Promise<R>((resolve, reject) => {
      const { data, headers, method = Methods.GET, timeout = 0 } = options;

      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        method === Methods.GET && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      for (const header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === Methods.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
