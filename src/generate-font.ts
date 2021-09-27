import figlet, { Fonts } from "figlet";
import chalk from "chalk";
import boxen from "boxen";

function generateFigText(
  text: string,
  font: Fonts = "Ogre"
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    figlet.text(text, { font }, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

async function generateWelcomeText(): Promise<string> {
  const titleText = await generateFigText("Swords & Wizardry");
  const subtitleText = await generateFigText("Character Generation Tool");
  return `${chalk.yellow(titleText)}\n${chalk.green(subtitleText)}`;
}

async function displayWelcomeMessage(): Promise<void> {
  const formattedMessage = await generateWelcomeText();
  const decoratedWelcomeMessage = boxen(formattedMessage, {
    textAlignment: "center",
    borderStyle: "round",
    padding: 1,
  });
  console.log(decoratedWelcomeMessage);
  await new Promise((resolve) => setTimeout(resolve, 1250));
}

export { displayWelcomeMessage, generateFigText, generateWelcomeText };
