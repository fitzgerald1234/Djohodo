import { rules } from "../rule";
import fs from 'fs';

export function checkEventsForAgent(req, res) {
    let id = req.body.id;
    let output = [];
    fs.readFile(`./logs/${id}.log`, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("auth.log", data);
        //res.status(200).send(data);
    });
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].checkRule()) {
            output.push({RuleId: rules[i].id,
                       Description: rules[i].description,
                       Severity: rules[i].severity
            });
        }
    }

    output.push({RuleId: rules[1].id,
        Description: rules[1].description,
        Severity: rules[1].severity
});

output.push({RuleId: rules[1].id,
    Description: rules[1].description,
    Severity: rules[1].severity
});
output.push({RuleId: rules[1].id,
    Description: rules[1].description,
    Severity: rules[1].severity
});
output.push({RuleId: rules[1].id,
    Description: rules[1].description,
    Severity: rules[1].severity
});
output.push({RuleId: rules[1].id,
    Description: rules[1].description,
    Severity: rules[1].severity
});

    console.log(output);
    res.status(200).json(output);
}
