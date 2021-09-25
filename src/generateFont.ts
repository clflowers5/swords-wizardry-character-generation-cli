import figlet, { Fonts } from "figlet";
import chalk from "chalk";

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

export { generateFigText, generateWelcomeText };
