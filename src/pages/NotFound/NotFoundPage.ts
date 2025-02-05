import { ErrorPageLayout } from "../../components/ErrorPageLayout";

export class NotFoundPage extends ErrorPageLayout {
  constructor() {
    super({
      code: "404",
      title: "Page not found",
    });
  }
}
