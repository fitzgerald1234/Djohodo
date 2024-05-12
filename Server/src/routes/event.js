import { rules } from "../rule";

export function checkEvents(req, res) {
    let id = req.body.id;
    let output;
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].checkRule()) {
            output = {RuleId: rules[i].id,
                       Description: rules[i].description,
                       Severity: rules[i].severity
            }
        }
    }
    console.log(output);
    res.status(200).json(output);
}
