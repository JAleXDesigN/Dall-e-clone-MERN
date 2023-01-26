import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export const generateImage = async (form, setGeneratingImg, setForm) => {
  if (form.prompt) {
    try {
      setGeneratingImg(true);
      const response = await fetch("http://localhost:4000/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: form.prompt,
        }),
      });

      const data = await response.json();
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (err) {
      alert(err);
    } finally {
      setGeneratingImg(false);
    }
  } else {
    alert("Please provide proper prompt");
  }
};
