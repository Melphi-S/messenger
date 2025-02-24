import Handlebars from "handlebars";
import { Avatar } from "../components/Avatar";
import { Block, BlockProps } from "../core/Block.ts";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { v4 as uuidv4 } from "uuid";
import { MessageList } from "../components/Chat/MessageList/MessageList.ts";
import ChatHeader from "../components/Chat/ChatHeader/ChatHeader.ts";

const componentsMap: Record<string, typeof Block> = {
  Avatar,
  Input,
  Button,
  MessageList,
  ChatHeader,
};

Handlebars.registerHelper("component", function (name: string, options) {
  const ComponentClass = componentsMap[name];
  if (!ComponentClass) {
    throw new Error(`No component ${name}`);
  }

  const props: BlockProps = { ...options.hash };

  const componentInstance = new ComponentClass(props);

  const placeholderId = uuidv4();

  const observer = new MutationObserver(() => {
    const placeholder = document.getElementById(placeholderId);

    if (placeholder) {
      placeholder.replaceWith(componentInstance.getContent());
      componentInstance.addEvents();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return new Handlebars.SafeString(`<div id="${placeholderId}"></div>`);
});

Handlebars.registerHelper("concat", function (...args) {
  args.pop();
  return args.join("");
});
