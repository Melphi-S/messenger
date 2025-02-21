enum Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface Options {
  method?: Methods;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
}

interface Response {
  ok: boolean;
  status: number;
  statusText: string;
  response: string;
}

type HTTPMethod = (
  url: string,
  options?: Partial<Options>,
) => Promise<Response>;

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
  static BASE_URL = import.meta.env.VITE_BASE_URL;
  protected endpoint: string;
  public get = this.createMethod(Methods.GET);
  public patch = this.createMethod(Methods.PATCH);
  public put = this.createMethod(Methods.PUT);
  public post = this.createMethod(Methods.POST);
  public delete = this.createMethod(Methods.DELETE);

  constructor(endpoint: string) {
    this.endpoint = HTTPTransport.BASE_URL + endpoint;
  }

  private createMethod(method: Methods): HTTPMethod {
    return (params, options = {}) =>
      this.request(this.endpoint + params, { ...options, method });
  }

  private request = (url: string, options: Options): Promise<Response> => {
    return new Promise<Response>((resolve, reject) => {
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

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.response,
          });
        }
      };

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onabort = () => reject(new Error("Request aborted"));
      xhr.onerror = () => reject(new Error(`Network error: ${xhr.statusText}`));
      xhr.ontimeout = () => reject(new Error("Request timeout"));
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (method === Methods.GET) {
        xhr.send();
      } else {
        console.log(data instanceof FormData);
        data instanceof FormData
          ? xhr.send(data)
          : xhr.send(JSON.stringify(data));
      }
    });
  };
}
