import {displayWelcomeMessage, inquirePrompts} from "./prompts";

(async () => {
  await displayWelcomeMessage()
  await inquirePrompts()
})();
