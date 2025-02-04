import { ErrorPageLayout } from "../../components/ErrorPageLayout/ErrorPageLayout.ts";

export class NotFoundPage extends ErrorPageLayout {
  constructor() {
    super({
      code: "404",
      title: "Page not found",
    });
  }
}
