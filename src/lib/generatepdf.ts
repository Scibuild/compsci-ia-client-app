import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ProfileItem } from '../providers/ProfileStore';


export const generateHTML = (profile: ProfileItem[]): string => {
  const htmlElements = profile.map((item) => {
    if(Array.isArray(item.value)) { // for the profile items that are lists
      // creates a list of 'list items' <li> tags with the values inside
      const listElements = item.value.map((val) => `<li><b>${val}</b></li>`);
      // we surround the list items with an unordered list tag and
      // add a heading to the list which is the field name
      // the p tag ensures that there is a new line so that the fields do not
      // just run togther. the id lets us give specific styling to specific fields if we wanted
      return `
      <p id="${item.id}">
        ${item.name}: 
        <ul>
        ${listElements.join('\n')}
        </ul>
      </p>
      `;
    } else { // for the profile items that are just strings
      // we just return the field name and field value in bold
      return `
      <p id="${item.id}">
        ${item.name}: <b>${item.value}</b>
      </p>
      `;
    }
  });
  // this is just an HTML template to surround our profile
  // we have to join the elements in the profile so that they are one string
  // and not an array of string
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pdf Content</title>
      <style>
        body { font-size: 16px; }
        h1 { text-align: center; }
      </style>
    </head>
    <body>
        <h1>Profile</h1>
        ${htmlElements.join('')}
    </body>
    </html> `;
  return htmlContent;
}

export const generatePDF = async (profile: ProfileItem[]): Promise<void> => {
  // here we use a try catch block because the pdf generating or sharing
  // might throw an error if something goes wrong such as incorrectly formatted HTML
  // in the future we might give more information to the client, but for now, 
  // simply logging the error is fine for debugging
    try {
      // the print function generates a uri (url) which points to the pdf file on the OS
      const { uri } = await Print.printToFileAsync({ html: generateHTML(profile) });
      // we use expo-share to directly share the file
      await Sharing.shareAsync(uri);
    } catch (err) {
        console.error(err);
    }
}
