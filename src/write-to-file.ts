import writeYamlFile from "write-yaml-file";

async function writeToFile(data: Record<string, unknown>): Promise<void> {
  const creationDate = new Date().toLocaleDateString();
  const fileName =
    `${data.name}-${data.race}-${data.class}-${creationDate}.yaml`.replace(
      /\/|\s/g,
      "-"
    );
  await writeYamlFile(fileName, data);
  console.log(`Saved file: ${fileName}`);
}

export { writeToFile };
