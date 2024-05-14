class Rule {
    constructor(id, description, severity, checkRule) {
        this.id = id;
        this.description = description;
        this.severity = severity;
        this.checkRule = checkRule;
        this.count = 0;
    }
    
    reset() {
        this.count = 0;
    }

}

export var rules = [
    new Rule(1, "check root authentification failed", 4, (logs) => {
        return true;
    }),
    new Rule(2, "check ssh brute force", 9, (logs) => {
        return false;
    }),
    new Rule(3, "login to root sucess", 7, (logs) => {
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