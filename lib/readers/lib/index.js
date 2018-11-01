import Restaurant from 'models';

export default class CSVRestaurantReader {
  

  read = () => new Promise((resolve, reject) => {
    const Regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    const fileUpload = document.getElementById('fileUpload');
    let rows = 'undefined';
    let result = [];

    if (Regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != 'undefined') {
        let reader = new FileReader();
        reader.onload = (e) => {
          rows = e.target.result.split('\n');
          if (rows && rows.length > 0) {
            for (let i = 1; i < rows.length; i++) {
              const cols = rows[i].split(',');
              if (cols.length == 4) {
                result.push(new Restaurant(cols[0], cols[1], cols[2], cols[3]));
              }
              resolve(result);
            }
          } else {
            reject(new Error('Empty file.'));
          }
        };
        reader.readAsText(fileUpload.files[0]);
      } else {
        reject(new Error('This browser does not support HTML5.'));
      }
    } else {
      reject(new Error('Please upload a valid CSV file.'));
    }
  });
}