import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ProfileItem } from '../providers/ProfileStore';


export const generateHTML = (profile: ProfileItem[]): string => {
  const htmlElements = profile.map((item) => {
    if(Array.isArray(item.value)) {
      const listElements = item.value.map((val) => `<li><b>${val}</b></li>`);
      return `
      <p id="${item.id}">
        ${item.name}: 
        <ul>
        ${listElements.join('\n')}
        </ul>
      </p>
      `;
    } else {
      return `
      <p id="${item.id}">
        ${item.name}: <b>${item.value}</b>
      </p>
      `;
    }
  });
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pdf Content</title>
      <style>
        body {
          font-size: 16px;
        }
        h1 {
          text-align: center;
        }
      </style>
    </head>
    <body>
        <h1>Profile</h1>
        ${htmlElements.join('')}
    </body>
    </html>
  `;
  return htmlContent;
}

export const generatePDF = async (profile: ProfileItem[]): Promise<void> => {
    try {
      const { uri } = await Print.printToFileAsync({ html: generateHTML(profile) });
      await Sharing.shareAsync(uri);
    } catch (err) {
        console.error(err);
    }
}
