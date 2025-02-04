import { ErrorPageLayout } from "../../components/ErrorPageLayout/ErrorPageLayout.ts";

export class ErrorPage extends ErrorPageLayout {
  constructor() {
    super({
      code: "500",
      title: "Something went wrong",
    });
  }
}
