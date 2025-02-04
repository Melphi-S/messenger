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

function queryStringify(data: Record<string, unknown>) {
  const queries: string[] = [];

  for (const key in data) {
    queries.push(`${key}=${data[key]}`);
  }

  return `?${queries.join("&")}`;
}

export class HTTPTransport {
  get = (url: string, options?: Options) => {
    return this.request(
      url,
      { ...options, method: Methods.GET },
      options?.timeout || 0,
    );
  };

  post = (url: string, options?: Options) => {
    return this.request(
      url,
      { ...options, method: Methods.POST },
      options?.timeout || 0,
    );
  };

  put = (url: string, options?: Options) => {
    return this.request(
      url,
      { ...options, method: Methods.PUT },
      options?.timeout || 0,
    );
  };

  patch = (url: string, options?: Options) => {
    return this.request(
      url,
      { ...options, method: Methods.PATCH },
      options?.timeout || 0,
    );
  };

  delete = (url: string, options?: Options) => {
    return this.request(
      url,
      { ...options, method: Methods.DELETE },
      options?.timeout || 0,
    );
  };

  request = (url: string, options: Options, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const { data, headers, method = Methods.GET } = options;

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

      const cancel = setTimeout(() => xhr.abort(), timeout);

      xhr.onload = () => {
        clearTimeout(cancel);
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Methods.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
