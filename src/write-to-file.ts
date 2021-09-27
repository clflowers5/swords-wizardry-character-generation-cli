import writeYamlFile from "write-yaml-file";

async function writeToFile(data: Record<string, string>): Promise<void> {
  const creationDate = new Date().toLocaleDateString();
  const fileName =
    `${data.name}-${data.race}-${data.class}-${creationDate}.json`.replace(
      /\/|\s/g,
      "-"
    );
  await writeYamlFile(fileName, data);
  console.log(`Saved file: ${fileName}`);
}

export { writeToFile };
