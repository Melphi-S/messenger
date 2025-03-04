import sinon from "sinon";
import { HTTPTransport } from "./HTTPTransport.ts";
import { expect } from "chai";

describe("HTTPTransport", () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];
  let httpTransport: HTTPTransport;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (req) => {
      requests.push(req);
    };

    httpTransport = new HTTPTransport("/test");
  });

  afterEach(() => {
    xhr.restore();
  });

  it("should make GET request", async () => {
    const promise = httpTransport.get("", {});

    const responseData = JSON.stringify({ data: "getTest" });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      responseData,
    );

    const response = await promise;

    expect(response.ok).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.response).to.equal(responseData);
  });

  it("should make handle body in GET request as query string", () => {
    httpTransport.get("", { data: { a: 1, b: "value" } });

    expect(requests[0].url).to.match(/\?(.*a=1.*b=value|.*b=value.*a=1)/);
  });

  it("should make POST request", async () => {
    const promise = httpTransport.post("", { data: { test: "test" } });

    const responseData = JSON.stringify({ data: "postTest" });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      responseData,
    );

    const response = await promise;

    expect(response.ok).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.response).to.equal(responseData);
  });

  it("should make POST request with FormData", async () => {
    const data = new FormData();
    data.append("test", "test");
    const promise = httpTransport.post("", { data });

    const responseData = JSON.stringify({ data: "postFormDataTest" });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      responseData,
    );

    const response = await promise;

    expect(response.ok).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.response).to.equal(responseData);
  });

  it("should make DELETE request", async () => {
    const promise = httpTransport.delete("", { data: { test: "test" } });

    const responseData = JSON.stringify({ data: "deleteTest" });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      responseData,
    );

    const response = await promise;

    expect(response.ok).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.response).to.equal(responseData);
  });

  it("should make PUT request", async () => {
    const promise = httpTransport.put("", { data: { test: "test" } });

    const responseData = JSON.stringify({ data: "putTest" });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      responseData,
    );

    const response = await promise;

    expect(response.ok).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.response).to.equal(responseData);
  });
});
