import { ClassProperty, Type } from "../Type";
import { Namer } from "../Naming";
import { RenderContext } from "../Renderer";
import { BooleanOption, Option, OptionValues } from "../RendererOptions";
import { TargetLanguage } from "../TargetLanguage";
import { Sourcelike } from "../Source";
import { ConvenienceRenderer } from "../ConvenienceRenderer";
export declare const typeScriptZodOptions: {
    justSchema: BooleanOption;
};
export declare class TypeScriptZodTargetLanguage extends TargetLanguage {
    protected getOptions(): Option<any>[];
    constructor(displayName?: string, names?: string[], extension?: string);
    protected makeRenderer(renderContext: RenderContext, untypedOptionValues: {
        [name: string]: any;
    }): TypeScriptZodRenderer;
}
export declare class TypeScriptZodRenderer extends ConvenienceRenderer {
    private readonly _options;
    constructor(targetLanguage: TargetLanguage, renderContext: RenderContext, _options: OptionValues<typeof typeScriptZodOptions>);
    protected forbiddenNamesForGlobalNamespace(): string[];
    protected nameStyle(original: string, upper: boolean): string;
    protected makeNamedTypeNamer(): Namer;
    protected makeUnionMemberNamer(): Namer;
    protected namerForObjectProperty(): Namer;
    protected makeEnumCaseNamer(): Namer;
    private importStatement;
    protected emitImports(): void;
    typeMapTypeForProperty(p: ClassProperty): Sourcelike;
    typeMapTypeFor(t: Type, required?: boolean): Sourcelike;
    private emitObject;
    private emitEnum;
    protected emitSchemas(): void;
    protected emitSourceStructure(): void;
}
