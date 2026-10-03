module.exports = [
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/.next-internal/server/app/[[...slug]]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "409fbf41b484d7f196f6ba6ea0979b66f49e5861b8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCalculator"],
    "40e16da48c74d2746e7fcf9e4f3c02556e468e00c9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSubject"],
    "608ae401ecb9de7e74b74e960f43afc1616d1d42db",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveCalculator"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b5b2e2e2e$slug$5d5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[[...slug]]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/[[...slug]]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/src/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"409fbf41b484d7f196f6ba6ea0979b66f49e5861b8":{"name":"deleteCalculator"},"40e16da48c74d2746e7fcf9e4f3c02556e468e00c9":{"name":"deleteSubject"},"608ae401ecb9de7e74b74e960f43afc1616d1d42db":{"name":"saveCalculator"}},"src/lib/actions.ts",""] */ __turbopack_context__.s([
    "deleteCalculator",
    ()=>deleteCalculator,
    "deleteSubject",
    ()=>deleteSubject,
    "saveCalculator",
    ()=>saveCalculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$evaluate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/evaluate.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slug.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
/** Shared validation for input rows and step rows — one code path so the two
 *  can't drift apart. Names must resolve uniquely, case-insensitively (the
 *  evaluator lowercases names), so both the reserved-word and duplicate
 *  checks compare lowercase. Explicit variables are grandfathered against the
 *  reserved-word check only (they predate it); the duplicate check applies to
 *  every row, because two inputs in the same calculator sharing a variable
 *  silently collide in scope. */ function validateRow(row, taken, kind) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(row.variable)) {
        return kind === "Input" ? "give it a label starting with a letter — the label becomes the formula variable, and units in parentheses are ignored (e.g. \"Mass (kg)\" → mass)." : "give it a label starting with a letter — it becomes the variable later steps can use.";
    }
    if (!row.explicit && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$evaluate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESERVED_WORDS"].has(row.variable.toLowerCase())) {
        return `its label would become "${row.variable}", which is reserved — use a different label.`;
    }
    if (taken.has(row.variable.toLowerCase())) {
        return `"${row.variable}" is used by more than one input or step — labels must be distinct.`;
    }
    return null;
}
async function saveCalculator(_prev, formData) {
    const id = formData.get("id") ?? undefined;
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const unit = String(formData.get("unit") ?? "").trim();
    const subjectName = String(formData.get("subject") ?? "").trim();
    const mode = formData.get("mode") === "steps" ? "steps" : "expression";
    // Rows arrive as parallel arrays. The variable field is hidden in the form —
    // blank means "derive it from the label".
    const labels = formData.getAll("label").map(String);
    const variables = formData.getAll("variable").map(String);
    const defaults = formData.getAll("default").map(String);
    const inputRows = labels.map((label, i)=>{
        const explicit = (variables[i] ?? "").trim();
        const derived = explicit || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["variableFromLabel"])(label);
        return {
            label: label.trim() || derived,
            variable: derived,
            explicit: explicit !== ""
        };
    });
    if (!name) return {
        error: "Name is required."
    };
    const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["slugify"])(name);
    if (!slug) return {
        error: "The name needs at least one letter or digit."
    };
    const subject = subjectName ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["slugify"])(subjectName) : null;
    if (subjectName && !subject) return {
        error: `"${subjectName}" can't be turned into a URL slug.`
    };
    if (subject && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isReserved"])(subject)) return {
        error: `"${subjectName}" is a reserved subject name.`
    };
    const taken = new Set();
    for (const [i, row] of inputRows.entries()){
        const problem = validateRow(row, taken, "Input");
        if (problem) return {
            error: `Input ${i + 1}: ${problem}`
        };
        taken.add(row.variable.toLowerCase());
    }
    const inputs = inputRows.map((row, i)=>{
        const fallback = Number(defaults[i]);
        return {
            label: row.label,
            variable: row.variable,
            defaultValue: Number.isFinite(fallback) ? fallback : 0
        };
    });
    // Build the formula from whichever mode the form used.
    let formula;
    if (mode === "steps") {
        const stepLabels = formData.getAll("stepLabel").map(String);
        const stepVariables = formData.getAll("stepVariable").map(String);
        const stepExpressions = formData.getAll("stepExpression").map(String);
        if (stepLabels.length === 0) return {
            error: "Add at least one step (or switch to a single expression)."
        };
        const steps = [];
        for(let i = 0; i < stepLabels.length; i++){
            const label = stepLabels[i].trim();
            const explicit = (stepVariables[i] ?? "").trim();
            const variable = explicit || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["variableFromLabel"])(label);
            const expression = (stepExpressions[i] ?? "").trim();
            const problem = validateRow({
                label: label || variable,
                variable,
                explicit: explicit !== ""
            }, taken, "Step");
            if (problem) return {
                error: `Step ${i + 1}: ${problem}`
            };
            taken.add(variable.toLowerCase());
            if (!expression) return {
                error: `Step ${i + 1}: expression is required.`
            };
            steps.push({
                label: label || variable,
                variable,
                expression
            });
        }
        formula = {
            kind: "steps",
            steps
        };
    } else {
        const expression = String(formData.get("expression") ?? "").trim();
        if (!expression) return {
            error: "Expression is required."
        };
        formula = {
            kind: "expression",
            expression
        };
    }
    // Dry-run: check that every name in every expression resolves. Values don't
    // matter here — bad results (division by zero, sqrt of a negative, …) are
    // reported live when Calculate is pressed, not at save time.
    const scope = {};
    for (const input of inputs)(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$evaluate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineVariable"])(scope, input.label, input.variable, input.defaultValue);
    if (formula.kind === "steps") {
        for (const [i, step] of formula.steps.entries()){
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$evaluate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["evaluate"])(step.expression, scope);
            } catch (error) {
                return {
                    error: `Step ${i + 1} (${step.label}): ${error instanceof Error ? error.message : "invalid expression."}`
                };
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$evaluate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineVariable"])(scope, step.label, step.variable, 0);
        }
    } else {
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$evaluate$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["evaluate"])(formula.expression, scope);
        } catch (error) {
            return {
                error: `Expression: ${error instanceof Error ? error.message : "invalid expression."}`
            };
        }
    }
    const calculator = {
        id: id ?? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])(),
        name,
        slug,
        description,
        subject,
        inputs,
        formula,
        unit
    };
    // Returning a string from the callback signals an error to mutate(): the
    // file is left untouched and nothing is revalidated.
    const error = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mutate"])((calculators)=>{
        if (calculators.some((c)=>c.slug === slug && c.id !== calculator.id)) {
            return `A calculator with the slug "${slug}" already exists — pick a different name.`;
        }
        const index = calculators.findIndex((c)=>c.id === calculator.id);
        if (index === -1) calculators.push(calculator);
        else calculators[index] = calculator;
        return null;
    });
    if (error) return {
        error
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculatorUrl"])({
        subject,
        slug
    }));
}
async function deleteCalculator(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mutate"])((calculators)=>{
        const index = calculators.findIndex((c)=>c.id === id);
        if (index !== -1) calculators.splice(index, 1);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/");
}
async function deleteSubject(slug) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mutate"])((calculators)=>{
        for (const calculator of calculators){
            if (calculator.subject === slug) calculator.subject = null;
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    saveCalculator,
    deleteCalculator,
    deleteSubject
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveCalculator, "608ae401ecb9de7e74b74e960f43afc1616d1d42db", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCalculator, "409fbf41b484d7f196f6ba6ea0979b66f49e5861b8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSubject, "40e16da48c74d2746e7fcf9e4f3c02556e468e00c9", null);
}),
"[project]/src/lib/evaluate.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RESERVED_WORDS",
    ()=>RESERVED_WORDS,
    "defineVariable",
    ()=>defineVariable,
    "evaluate",
    ()=>evaluate,
    "formatNumber",
    ()=>formatNumber,
    "runFormula",
    ()=>runFormula
]);
// Tiny safe expression evaluator — no eval. Supports + - * / % ^ ( ), numbers,
// variables, the functions below, and the constants pi and e.
// Variable lookup is case-insensitive and label-aware (see defineVariable).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slug.ts [app-rsc] (ecmascript)");
;
const FUNCTIONS = {
    sqrt: Math.sqrt,
    cbrt: Math.cbrt,
    abs: Math.abs,
    exp: Math.exp,
    ln: Math.log,
    log: Math.log10,
    log2: Math.log2,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    sign: Math.sign,
    min: (...a)=>Math.min(...a),
    max: (...a)=>Math.max(...a),
    pow: (a, b)=>a ** b,
    hypot: (...a)=>Math.hypot(...a)
};
const CONSTANTS = {
    pi: Math.PI,
    e: Math.E
};
const RESERVED_WORDS = new Set([
    ...Object.keys(FUNCTIONS),
    ...Object.keys(CONSTANTS)
]);
function tokenize(source) {
    const tokens = [];
    for(let i = 0; i < source.length;){
        const rest = source.slice(i);
        if (/\s/.test(rest[0])) {
            i += 1;
            continue;
        }
        const number = /^[0-9]*\.?[0-9]+/.exec(rest);
        if (number) {
            tokens.push({
                type: "num",
                value: number[0]
            });
            i += number[0].length;
            continue;
        }
        const name = /^[a-zA-Z_][a-zA-Z0-9_]*/.exec(rest);
        if (name) {
            tokens.push({
                type: "name",
                value: name[0]
            });
            i += name[0].length;
            continue;
        }
        if ("+-*/%^(),".includes(rest[0])) {
            tokens.push({
                type: "op",
                value: rest[0]
            });
            i += 1;
            continue;
        }
        throw new Error(`Unexpected character "${rest[0]}".`);
    }
    return tokens;
}
function evaluate(expression, variables) {
    const tokens = tokenize(expression);
    if (tokens.length === 0) throw new Error("Expression is empty.");
    let pos = 0;
    const peek = ()=>tokens[pos];
    const eat = (value)=>{
        const token = peek();
        if (token?.type === "op" && token.value === value) {
            pos += 1;
            return true;
        }
        return false;
    };
    // Precedence ladder, loosest to tightest:
    // expression (+ -) → term (* / %) → unary (-x) → power (^) → primary.
    function parseExpression() {
        let value = parseTerm();
        for(;;){
            if (eat("+")) value += parseTerm();
            else if (eat("-")) value -= parseTerm();
            else return value;
        }
    }
    function parseTerm() {
        let value = parseUnary();
        for(;;){
            if (eat("*")) value *= parseUnary();
            else if (eat("/")) value /= parseUnary();
            else if (eat("%")) value %= parseUnary();
            else return value;
        }
    }
    // Unary minus binds tighter than * but looser than ^, so -2^2 = -(2^2) = -4.
    function parseUnary() {
        if (eat("-")) return -parseUnary();
        if (eat("+")) return parseUnary();
        return parsePower();
    }
    // Right-associative: 2^3^2 = 2^(3^2). parseUnary on the right also allows 2^-3.
    function parsePower() {
        const base = parsePrimary();
        if (eat("^")) return base ** parseUnary();
        return base;
    }
    function parsePrimary() {
        const token = tokens[pos];
        pos += 1;
        if (!token) throw new Error("Expression ends unexpectedly.");
        if (token.type === "num") {
            const value = Number(token.value);
            if (!Number.isFinite(value)) throw new Error(`"${token.value}" is not a valid number.`);
            return value;
        }
        if (token.type === "op" && token.value === "(") {
            const value = parseExpression();
            if (!eat(")")) throw new Error('Missing ")".');
            return value;
        }
        if (token.type === "name") {
            const name = token.value;
            if (eat("(")) {
                const args = [];
                if (!eat(")")) {
                    do {
                        args.push(parseExpression());
                    }while (eat(","))
                    if (!eat(")")) throw new Error('Missing ")".');
                }
                // All FUNCTIONS keys are lowercase, so one lookup suffices.
                const fn = FUNCTIONS[name.toLowerCase()];
                if (!fn) throw new Error(`Unknown function "${name}".`);
                return fn(...args);
            }
            // Case-insensitive: try the exact spelling first, then lowercase.
            if (Object.hasOwn(variables, name)) return variables[name];
            const lower = name.toLowerCase();
            if (Object.hasOwn(variables, lower)) return variables[lower];
            if (Object.hasOwn(CONSTANTS, lower)) return CONSTANTS[lower];
            if (Object.hasOwn(FUNCTIONS, lower)) throw new Error(`"${name}" is a function — call it like ${name}(x).`);
            const hint = suggest(name, [
                ...Object.keys(variables),
                ...Object.keys(CONSTANTS)
            ]);
            throw new Error(`Unknown variable "${name}"${hint ? ` — did you mean "${hint}"?` : ""}.`);
        }
        throw new Error(`Unexpected "${token.value}".`);
    }
    const result = parseExpression();
    if (pos < tokens.length) throw new Error(`Unexpected "${tokens[pos].value}".`);
    return result;
}
/** Best close match for a misspelled name, or null. */ function suggest(name, candidates) {
    const target = name.toLowerCase();
    let best = null;
    let bestDistance = 3; // only very close matches get suggested
    for (const candidate of candidates){
        // A Levenshtein distance is at least the length difference, so skip
        // candidates that can't possibly beat the current best without computing it.
        if (Math.abs(target.length - candidate.length) >= bestDistance) continue;
        const distance = editDistance(target, candidate.toLowerCase());
        if (distance < bestDistance) {
            best = candidate;
            bestDistance = distance;
        }
    }
    return best;
}
function editDistance(a, b) {
    const row = Array.from({
        length: b.length + 1
    }, (_, i)=>i);
    for(let i = 1; i <= a.length; i++){
        let previous = row[0];
        row[0] = i;
        for(let j = 1; j <= b.length; j++){
            const temp = row[j];
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
            previous = temp;
        }
    }
    return row[b.length];
}
function formatNumber(value) {
    return Number(value.toPrecision(12)).toLocaleString("en-US", {
        maximumFractionDigits: 10
    });
}
function defineVariable(scope, label, variable, value) {
    scope[variable] = value;
    const lower = variable.toLowerCase();
    if (!Object.hasOwn(scope, lower)) scope[lower] = value;
    const alias = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["variableFromLabel"])(label);
    if (alias && !Object.hasOwn(scope, alias)) scope[alias] = value;
}
function runFormula(calculator, raw) {
    const variables = {};
    for (const input of calculator.inputs){
        const text = raw[input.variable];
        const value = Number(text);
        if (text === undefined || text === "" || !Number.isFinite(value)) {
            return {
                ok: false,
                error: `Enter a number for "${input.label}".`
            };
        }
        variables[input.variable] = value;
    }
    // Narrowing only works when formula.kind is tested directly here — don't save
    // the comparison into a boolean first.
    const { formula } = calculator;
    const parts = formula.kind === "steps" ? formula.steps : [
        {
            label: "Result",
            variable: "",
            expression: formula.expression
        }
    ];
    const scope = {};
    for (const input of calculator.inputs)defineVariable(scope, input.label, input.variable, variables[input.variable]);
    const steps = [];
    for (const [index, part] of parts.entries()){
        let value;
        try {
            value = evaluate(part.expression, scope);
        } catch (error) {
            const at = formula.kind === "steps" ? ` in step ${index + 1} (${part.label})` : "";
            return {
                ok: false,
                error: `${error instanceof Error ? error.message : "Invalid expression."}${at}`
            };
        }
        if (!Number.isFinite(value)) {
            const at = formula.kind === "steps" ? ` in step ${index + 1}` : "";
            return {
                ok: false,
                error: `Non-finite number${at} — division by zero or out-of-domain operation?`
            };
        }
        if (part.variable) defineVariable(scope, part.label, part.variable, value);
        steps.push({
            label: part.label,
            expression: part.expression,
            value
        });
    }
    const result = steps.at(-1)?.value;
    return result === undefined ? {
        ok: false,
        error: "The formula is empty."
    } : {
        ok: true,
        steps: formula.kind === "steps" ? steps : [],
        result
    };
}
}),
"[project]/src/lib/slug.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculatorUrl",
    ()=>calculatorUrl,
    "isReserved",
    ()=>isReserved,
    "slugify",
    ()=>slugify,
    "titleize",
    ()=>titleize,
    "variableFromLabel",
    ()=>variableFromLabel
]);
// Subject slugs can't collide with app routes.
const RESERVED = new Set([
    "calculators",
    "edit",
    "new",
    "api"
]);
function slugify(text) {
    return text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64).replace(/-+$/g, "");
}
function isReserved(slug) {
    return RESERVED.has(slug);
}
function variableFromLabel(label) {
    return label.replace(/\([^)]*\)/g, " ").replace(/\[[^\]]*\]/g, " ").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40).replace(/_+$/g, "");
}
function calculatorUrl(calculator) {
    return calculator.subject ? `/${calculator.subject}/${calculator.slug}` : `/calculators/${calculator.slug}`;
}
function titleize(slug) {
    return slug.charAt(0).toUpperCase() + slug.slice(1);
}
}),
"[project]/src/lib/store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCalculators",
    ()=>getCalculators,
    "mutate",
    ()=>mutate
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
;
;
;
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "calculators.json");
/** NOTE: JSON-file persistence is only safe for a single Node process on a
 *  writable disk. The in-process lock below does nothing on serverless or
 *  multi-instance deployments (Vercel, etc.), where the file is typically
 *  read-only or diverges per instance — swap this module for SQLite or a real
 *  database before deploying that way. The file is gitignored and regenerated
 *  from SEED on first read if missing. */ const SEED = {
    calculators: [
        {
            id: "quadratic-root",
            name: "Quadratic Root",
            slug: "quadratic-root",
            description: "Larger real root of ax² + bx + c = 0.",
            subject: "math",
            inputs: [
                {
                    label: "Coefficient a",
                    variable: "a",
                    defaultValue: 1
                },
                {
                    label: "Coefficient b",
                    variable: "b",
                    defaultValue: -3
                },
                {
                    label: "Coefficient c",
                    variable: "c",
                    defaultValue: 2
                }
            ],
            formula: {
                kind: "steps",
                steps: [
                    {
                        label: "Discriminant (b² − 4ac)",
                        variable: "discriminant",
                        expression: "b^2 - 4*a*c"
                    },
                    {
                        label: "Larger root",
                        variable: "root",
                        expression: "(-b + sqrt(discriminant)) / (2*a)"
                    }
                ]
            },
            unit: ""
        },
        {
            id: "circle-area",
            name: "Circle Area",
            slug: "circle-area",
            description: "Area of a circle.",
            subject: "math",
            inputs: [
                {
                    label: "Radius",
                    variable: "r",
                    defaultValue: 5
                }
            ],
            formula: {
                kind: "expression",
                expression: "pi * r^2"
            },
            unit: "m²"
        },
        {
            id: "hypotenuse",
            name: "Hypotenuse",
            slug: "hypotenuse",
            description: "Longest side of a right triangle.",
            subject: "math",
            inputs: [
                {
                    label: "Side a",
                    variable: "a",
                    defaultValue: 3
                },
                {
                    label: "Side b",
                    variable: "b",
                    defaultValue: 4
                }
            ],
            formula: {
                kind: "expression",
                expression: "sqrt(a^2 + b^2)"
            },
            unit: ""
        },
        {
            id: "kinetic-energy",
            name: "Kinetic Energy",
            slug: "kinetic-energy",
            description: "Energy of a moving mass.",
            subject: "physics",
            inputs: [
                {
                    label: "Mass (kg)",
                    variable: "m",
                    defaultValue: 70
                },
                {
                    label: "Velocity (m/s)",
                    variable: "v",
                    defaultValue: 10
                }
            ],
            formula: {
                kind: "expression",
                expression: "0.5 * m * v^2"
            },
            unit: "J"
        },
        {
            id: "free-fall-time",
            name: "Free Fall Time",
            slug: "free-fall-time",
            description: "Time to fall from a height, ignoring drag.",
            subject: "physics",
            inputs: [
                {
                    label: "Height (m)",
                    variable: "h",
                    defaultValue: 20
                },
                {
                    label: "Gravity (m/s²)",
                    variable: "g",
                    defaultValue: 9.81
                }
            ],
            formula: {
                kind: "expression",
                expression: "sqrt(2*h/g)"
            },
            unit: "s"
        },
        {
            id: "compound-interest",
            name: "Compound Interest",
            slug: "compound-interest",
            description: "Future value of an investment.",
            subject: "finance",
            inputs: [
                {
                    label: "Principal",
                    variable: "P",
                    defaultValue: 1000
                },
                {
                    label: "Annual rate (%)",
                    variable: "r",
                    defaultValue: 5
                },
                {
                    label: "Compounds per year",
                    variable: "n",
                    defaultValue: 12
                },
                {
                    label: "Years",
                    variable: "t",
                    defaultValue: 10
                }
            ],
            formula: {
                kind: "steps",
                steps: [
                    {
                        label: "Rate per period",
                        variable: "rate",
                        expression: "r / (100 * n)"
                    },
                    {
                        label: "Future value",
                        variable: "future_value",
                        expression: "P * (1 + rate)^(n * t)"
                    }
                ]
            },
            unit: ""
        },
        {
            id: "tip-splitter",
            name: "Tip Splitter",
            slug: "tip-splitter",
            description: "Split a bill with tip.",
            subject: "finance",
            inputs: [
                {
                    label: "Bill",
                    variable: "bill",
                    defaultValue: 84
                },
                {
                    label: "Tip (%)",
                    variable: "tip",
                    defaultValue: 15
                },
                {
                    label: "People",
                    variable: "people",
                    defaultValue: 3
                }
            ],
            formula: {
                kind: "expression",
                expression: "bill * (1 + tip/100) / people"
            },
            unit: ""
        },
        {
            id: "bmi",
            name: "BMI",
            slug: "bmi",
            description: "Body mass index.",
            subject: null,
            inputs: [
                {
                    label: "Weight (kg)",
                    variable: "weight",
                    defaultValue: 70
                },
                {
                    label: "Height (m)",
                    variable: "height",
                    defaultValue: 1.75
                }
            ],
            formula: {
                kind: "expression",
                expression: "weight / height^2"
            },
            unit: "kg/m²"
        }
    ]
};
// All reads/writes go through one promise chain so they never interleave.
let queue = Promise.resolve();
function withLock(task) {
    const run = queue.then(task, task);
    queue = run.then(()=>undefined, ()=>undefined);
    return run;
}
async function read() {
    try {
        const parsed = JSON.parse(await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["promises"].readFile(DB_PATH, "utf8"));
        const calculators = (parsed.calculators ?? []).map((raw)=>raw.formula ? raw : {
                ...raw,
                formula: {
                    kind: "expression",
                    expression: raw.expression ?? ""
                }
            });
        return {
            calculators
        };
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
        await write(SEED);
        return SEED;
    }
}
async function write(db) {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["promises"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(DB_PATH), {
        recursive: true
    });
    // Write to a temp file, then rename: rename is atomic on POSIX, so a crash
    // mid-write can never leave a half-written (corrupt) database behind.
    const tmpPath = `${DB_PATH}.${process.pid}.${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])()}.tmp`;
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["promises"].writeFile(tmpPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["promises"].rename(tmpPath, DB_PATH);
}
const getCalculators = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const db = await withLock(()=>read());
    return db.calculators;
});
async function mutate(fn) {
    return withLock(async ()=>{
        const db = await read();
        const value = fn(db.calculators);
        // A returned string means the mutation was rejected — skip the write and
        // the revalidation so unchanged data doesn't dirty the file or the cache.
        if (typeof value === "string") return value;
        await write(db);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/", "layout");
        return value;
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1uucx9p._.js.map