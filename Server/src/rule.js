class Rule {
    constructor(id, description, severity, checkRule) {
        this.id = id;
        this.description = description;
        this.severity = severity;
        this.checkRule = checkRule;
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