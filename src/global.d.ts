declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars";
  const content: TemplateDelegate;
  export default content;
}
