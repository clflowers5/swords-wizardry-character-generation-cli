import { displayWelcomeMessage } from "./generate-font";
import { inquirePrompts } from "./prompts";

(async () => {
  await displayWelcomeMessage();
  await inquirePrompts();
})();
