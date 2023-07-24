"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptEffectSchemaRenderer = exports.TypeScriptEffectSchemaTargetLanguage = exports.typeScriptEffectSchemaOptions = void 0;
const collection_utils_1 = require("collection-utils");
const TypeUtils_1 = require("../TypeUtils");
const Naming_1 = require("../Naming");
const RendererOptions_1 = require("../RendererOptions");
const Acronyms_1 = require("../support/Acronyms");
const Strings_1 = require("../support/Strings");
const TargetLanguage_1 = require("../TargetLanguage");
const JavaScript_1 = require("./JavaScript");
const Support_1 = require("../support/Support");
const ConvenienceRenderer_1 = require("../ConvenienceRenderer");
exports.typeScriptEffectSchemaOptions = {
    justSchema: new RendererOptions_1.BooleanOption("just-schema", "Schema only", false)
};
class TypeScriptEffectSchemaTargetLanguage extends TargetLanguage_1.TargetLanguage {
    getOptions() {
        return [];
    }
    constructor(displayName = "TypeScript Effect Schema", names = ["typescript-effect-schema"], extension = "ts") {
        super(displayName, names, extension);
    }
    makeRenderer(renderContext, untypedOptionValues) {
        return new TypeScriptEffectSchemaRenderer(this, renderContext, (0, RendererOptions_1.getOptionValues)(exports.typeScriptEffectSchemaOptions, untypedOptionValues));
    }
}
exports.TypeScriptEffectSchemaTargetLanguage = TypeScriptEffectSchemaTargetLanguage;
class TypeScriptEffectSchemaRenderer extends ConvenienceRenderer_1.ConvenienceRenderer {
    constructor(targetLanguage, renderContext, _options) {
        super(targetLanguage, renderContext);
        this._options = _options;
    }
    forbiddenNamesForGlobalNamespace() {
        return ["Class", "Date", "Object", "String", "Array", "JSON", "Error"];
    }
    nameStyle(original, upper) {
        const acronyms = (0, Acronyms_1.acronymStyle)(Acronyms_1.AcronymStyleOptions.Camel);
        const words = (0, Strings_1.splitIntoWords)(original);
        return (0, Strings_1.combineWords)(words, JavaScript_1.legalizeName, upper ? Strings_1.firstUpperWordStyle : Strings_1.allLowerWordStyle, Strings_1.firstUpperWordStyle, upper ? s => (0, Strings_1.capitalize)(acronyms(s)) : Strings_1.allLowerWordStyle, acronyms, "", Strings_1.isLetterOrUnderscore);
    }
    makeNamedTypeNamer() {
        return (0, Naming_1.funPrefixNamer)("types", s => this.nameStyle(s, true));
    }
    makeUnionMemberNamer() {
        return (0, Naming_1.funPrefixNamer)("properties", s => this.nameStyle(s, true));
    }
    namerForObjectProperty() {
        return (0, Naming_1.funPrefixNamer)("properties", s => this.nameStyle(s, true));
    }
    makeEnumCaseNamer() {
        return (0, Naming_1.funPrefixNamer)("enum-cases", s => this.nameStyle(s, false));
    }
    importStatement(lhs, moduleName) {
        return ["import ", lhs, " from ", moduleName, ";"];
    }
    emitImports() {
        this.ensureBlankLine();
        this.emitLine(this.importStatement("* as Schema", '"@effect/schema/Schema"'));
    }
    typeMapTypeForProperty(p) {
        const typeMap = this.typeMapTypeFor(p.type);
        return p.isOptional ? ["Schema.optional(", typeMap, ")"] : typeMap;
    }
    typeMapTypeFor(t, required = true) {
        if (["class", "object", "enum"].indexOf(t.kind) >= 0) {
            return ["Schema.lazy(() => ", this.nameForNamedType(t), "Schema)"];
        }
        const match = (0, TypeUtils_1.matchType)(t, _anyType => "Schema.any", _nullType => "Schema.null", _boolType => "Schema.boolean", _integerType => "Schema.number", _doubleType => "Schema.number", _stringType => "Schema.string", arrayType => ["Schema.array(", this.typeMapTypeFor(arrayType.items, false), ")"], _classType => (0, Support_1.panic)("Should already be handled."), _mapType => ["Schema.record(Schema.string, ", this.typeMapTypeFor(_mapType.values, false), ")"], _enumType => (0, Support_1.panic)("Should already be handled."), unionType => {
            const children = Array.from(unionType.getChildren()).map((type) => this.typeMapTypeFor(type, false));
            return ["Schema.union(", ...(0, collection_utils_1.arrayIntercalate)(", ", children), ")"];
        }, _transformedStringType => {
            return "Schema.string";
        });
        if (required) {
            return [match];
        }
        return match;
    }
    emitObject(name, t) {
        this.ensureBlankLine();
        this.emitLine("\nexport const ", name, "Schema = ", "Schema.struct({");
        this.indent(() => {
            this.forEachClassProperty(t, "none", (_, jsonName, property) => {
                this.emitLine(`"${(0, Strings_1.utf16StringEscape)(jsonName)}"`, ": ", this.typeMapTypeForProperty(property), ",");
            });
        });
        this.emitLine("});");
        if (!this._options.justSchema) {
            this.emitLine("export type ", name, " = Schema.From<typeof ", name, "Schema>;");
        }
    }
    emitEnum(e, enumName) {
        this.ensureBlankLine();
        this.emitDescription(this.descriptionForType(e));
        this.emitLine("\nexport const ", enumName, "Schema = ", "Schema.enums({");
        this.indent(() => this.forEachEnumCase(e, "none", (_, jsonName) => {
            const name = (0, Strings_1.stringEscape)(jsonName);
            this.emitLine('"', name, '": "', name, '",');
        }));
        this.emitLine("});");
        if (!this._options.justSchema) {
            this.emitLine("export type ", enumName, " = Schema.From<typeof ", enumName, "Schema>;");
        }
    }
    emitSchemas() {
        this.ensureBlankLine();
        this.forEachEnum("leading-and-interposing", (u, enumName) => {
            this.emitEnum(u, enumName);
        });
        const order = [];
        const mapKey = [];
        const mapValue = [];
        this.forEachObject("none", (type, name) => {
            mapKey.push(name);
            mapValue.push(this.gatherSource(() => this.emitObject(name, type)));
        });
        mapKey.forEach((_, index) => {
            // assume first
            let ordinal = 0;
            // pull out all names
            const source = mapValue[index];
            const names = source.filter(value => value);
            // must be behind all these names
            for (let i = 0; i < names.length; i++) {
                const depName = names[i];
                // find this name's ordinal, if it has already been added
                for (let j = 0; j < order.length; j++) {
                    const depIndex = order[j];
                    if (mapKey[depIndex] === depName) {
                        // this is the index of the dependency, so make sure we come after it
                        ordinal = Math.max(ordinal, depIndex + 1);
                    }
                }
            }
            // insert index
            order.splice(ordinal, 0, index);
        });
        // now emit ordered source
        order.forEach(i => this.emitGatheredSource(mapValue[i]));
    }
    emitSourceStructure() {
        if (this.leadingComments !== undefined) {
            this.emitCommentLines(this.leadingComments);
        }
        this.emitImports();
        this.emitSchemas();
    }
}
exports.TypeScriptEffectSchemaRenderer = TypeScriptEffectSchemaRenderer;
