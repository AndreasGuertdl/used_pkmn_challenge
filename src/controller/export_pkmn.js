import * as fs from 'fs';

export function createJsonFile(req, res) {
    //console.log(req.body);
    const pkmnArray = req.body.pkmnList;
    const path = req.body.path;
    const file = fs.readFileSync(path);
    const conversion = null;
    const whiteSpace = 4;

    pkmnArray.pkmnList.forEach((value) => {
        if (file.length === 0) {
            fs.writeFileSync(path, JSON.stringify(value, conversion, whiteSpace));
        } else {
            const json = JSON.parse(file.toString());
            json.push(value);
            fs.writeFileSync(path, JSON.stringify(json));
        }
    })
    res.status(200).send({ message: "Gen data writen to JSON!" });
}