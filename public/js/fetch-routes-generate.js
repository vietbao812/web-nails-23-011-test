// const fs = require('fs');
// fs.readdir('./content', (err, files) => {
//   if (err) {
//     console.log(err);
//   } else {
//     const routes = files.map(file => {
//       return '/' + file
//         .replace('index.yml', '')
//         .replace('.yml', '');
//     });
//     fs.readFile('./nuxt.config.ts', 'utf-8', (err, data) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(data);
//         let replaced = data.replace(/routes: \[.*\]/, `routes: ${JSON.stringify(routes)}`).replaceAll('\"', '\'');

//         // Write result back to nuxt.config.ts
//         fs.writeFile('./nuxt.config.ts', replaced, 'utf-8', function (err) {
//           console.log(replaced)
//             if(err){
//               console.log(err);
//             }
//         });
//       }
//     });
//   }
// });


const fs = require('fs');
const async = require('async');

fs.readdir('./content', async (err, files) => {
  let nestedFiles = [];

  const getNestedFiles = (dir) => {
    fs.readdir("./content/" + dir, (_err, _files) => {
      let folders = _files?.filter(file => !file?.includes(".yml"));
      let notFolders = _files?.filter(file => file?.includes(".yml"));
      if(!_err) {
        // folders?.forEach(folder => getNestedFiles(dir + "/" + folder));

        async.eachSeries(folders, (folder) => {
          getNestedFiles(dir + "/" + folder);
        });
        nestedFiles.push(...notFolders.map(file => dir + "/" + file));
      }
    });
  }
  
  let folders = files.filter(file => !file?.includes(".yml"));
  async.eachSeries(folders, (folder) => {
    getNestedFiles(folder);
  });

  // folders?.forEach(folder => getNestedFiles(folder));

  await new Promise(resolve => setTimeout(resolve, 3));
  
  if (err) {
    console.log(err);
  } else {
    files = [...files, ...nestedFiles]?.filter(file => file.includes(".yml"));
    console.log(files);
    const routes = files.map(file => {
      return '/' + file
        .replace('index.yml', '')
        .replace('.yml', '');
    });
    fs.readFile('./nuxt.config.ts', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(data);
        let replaced = data.replace(/routes: \[.*\]/, `routes: ${JSON.stringify(routes)}`).replaceAll('\"', '\'');

        // Write result back to nuxt.config.ts
        fs.writeFile('./nuxt.config.ts', replaced, 'utf-8', function (err) {
          // console.log(replaced)
          if(err){
            console.log(err);
          }
        });
      }
    });
  }
});