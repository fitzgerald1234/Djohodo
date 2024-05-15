class Rule {
    constructor(id, description, severity, count, checkRule) {
        this.id = id;
        this.description = description;
        this.severity = severity;
        this.checkRule = checkRule;
        this.count = count;
    }
    
    reset() {
        this.count = 0;
    }

}

export var rules = [
    new Rule(1, "check root authentification failed", 3, 0, (logs) => {
        if (logs)
            if (logs.content.includes("FAILED SU (to root)"))
                return true;
            else
                return false;
    }),
    new Rule(2, "check root authentification success", 4, 0, (logs) => {
        if (logs.content.includes("session opened for user root") && logs.service == "sudo")
            return true;
        else
            return false;
    }),
    new Rule(3, "check ssh brute force", 9, 0, (logs) => {
        return false;
    }),
    new Rule(4, "login to root sucess", 7, 0, (logs) => {
        return false;
    })
]

export function getAllRules(req, res)
{
    let output = []
    for (let i = 0; i < rules.length; i++) {
        output.push({RuleId: rules[i].id,
                Description: rules[i].description,
                Severity: rules[i].severity
        });
    }
    return res.status(200).send(output);
}
