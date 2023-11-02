export interface IValidData {
  prop: string;
  valid: boolean;
  message: string;
}
export type Rule = {
  required?: boolean;
  pattern?: RegExp;
  message: string;
  validator?: (v: string) => boolean;
};
export interface Rules {
  [key: string]: Array<Rule>;
}
export interface IValidResult {
  [key: keyof Rules]: IValidData;
}
export type triggerValidProp = (prop: string, v: any) => IValidData;
export type triggerValidAll = (data: any) => [boolean, Array<IValidData>];
