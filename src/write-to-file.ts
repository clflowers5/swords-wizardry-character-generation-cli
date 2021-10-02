import writeYamlFile from "write-yaml-file";

async function writeToFile(data: Record<string, unknown>): Promise<void> {
  const fileName =
    `${data.name}-${data.race}-${data.class}.yaml`.replace(
      /\/|\s/g,
      "-"
    );
  await writeYamlFile(`./characters/${fileName}`, data);
  console.log(`Saved file: ${fileName}`);
}

export { writeToFile };
