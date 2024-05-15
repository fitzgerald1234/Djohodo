import { rules } from "../rule";
import fs from 'fs';

export function checkEventsForAgent(req, res) {
    let id = req.body.id;
    let output = [];
    var auth_log;
    fs.readFile(`./logs/${id}.log`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log("auth.log", JSON.parse(data)["auth.log"]);
        auth_log = JSON.parse(data)["auth.log"];
        //res.status(200).send(data);
    // for (let i = 0; i < rules.length; i++) {
    //     if (rules[i].checkRule()) {
    //         output.push({RuleId: rules[i].id,
    //                    Description: rules[i].description,
    //                    Severity: rules[i].severity
    //         });
    //     }
    // }
    for (let i = 0; i < auth_log.length; i++) {
        for (let j = 0; j < rules.length; j++) {
            if (rules[j].checkRule(auth_log[i])) {
                output.push({RuleId: rules[j].id,
                           Description: rules[j].description,
                           Severity: rules[j].severity
                });
            }    
        }
    }


    console.log(output);
    res.status(200).json(output);
});

}
