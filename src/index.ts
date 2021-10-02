import { displayWelcomeMessage } from "./generate-font";
import { displayPrompts } from "./prompts";
import { formatAnswers } from "./utils";
import { render as prettyJson } from "prettyjson";
import { writeToFile } from "./write-to-file";
import { processAnswers } from "./process-answers";

(async () => {
  await displayWelcomeMessage();
  const characterDetailsAnswers = await displayPrompts();
  const processedAnswers = processAnswers(characterDetailsAnswers);
  const formattedAnswers = formatAnswers(processedAnswers);
  console.log(prettyJson(formattedAnswers));
  await writeToFile(formattedAnswers);
})();
