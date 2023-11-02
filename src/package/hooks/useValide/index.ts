import { reactive } from "vue";

interface IValidData {
  prop: string;
  valid: boolean;
  message: string;
}
type Rule = {
  required?: boolean;
  pattern?: RegExp;
  message: string;
  validator?: (v: string) => boolean;
};
interface Rules {
  [key: string]: Array<Rule>;
}
interface IValidResult {
  [key: keyof Rules]: IValidData;
}
type triggerValidProp = (prop: string, v: any) => IValidData;
type triggerValidAll = (data: any) => [boolean, Array<IValidData>];

// 帮我写文档注释
/**
 * @description: 用于表单校验 支持required pattern validator
 * @param {Rules} rules 校验规则
 * example: {
 *  name:[{required:true,message:'请输入姓名'}],
 * age:[{required:true,message:'请输入年龄'}],
 * phone:[{required:true,message:'请输入手机号'},{pattern:/^1\d{10}$/,message:'请输入正确的手机号'}],
 * }
 * @return {[IValidResult,triggerValidProp,triggerValidAll]} validResult 校验结果 triggerValidProp 触发单个校验 triggerValidAll 触发全部校验
 * @example:
 * const [validResult,triggerValidProp,triggerValidAll] = useValid({
 *   name:[{required:true,message:'请输入姓名'}],
 *   age:[{required:true,message:'请输入年龄'}],
 *   phone:[{required:true,message:'请输入手机号'},{pattern:/^1\d{10}$/,message:'请输入正确的手机号'}],
 * })
 * triggerValidProp('name','') // {prop:'name',valid:false,message:'请输入姓名'}
 * triggerValidProp('name','张三') // {prop:'name',valid:true,message:'校验通过'}
 * triggerValidAll({name:'张三',age:18,phone:'12345678901'}) // [true,[
 *   {prop:'name',valid:true,message:'校验通过'},
 *   {prop:'age',valid:true,message:'校验通过'},
 *   {prop:'phone',valid:false,message:'请输入正确的手机号'}
 * ]]
 * validResult // {
 *  name:{prop:'name',valid:true,message:'校验通过'},
 * age:{prop:'age',valid:true,message:'校验通过'},
 * phone:{prop:'phone',valid:false,message:'请输入正确的手机号'}
 * }
 */
export default function useValid(
  rules: Rules
): [IValidResult, triggerValidProp, triggerValidAll] {
  const validResult = reactive<IValidResult>({});
  function triggerValidProp(prop: string, v: any): IValidData {
    const validData = reactive<IValidData>({
      prop: "",
      valid: true,
      message: "校验通过",
    });
    const faild = (message: string) => {
      validData.valid = false;
      validData.message = message;
      validResult[prop] = validData;
    };
    validData.prop = prop;
    const rule = rules[prop];
    if (rule) {
      for (let i = 0; i < rule.length; i++) {
        const r = rule[i];
        if (r.required && !v) {
          faild(r.message);
          break;
        }
        if (r.validator) {
          const valid = r.validator(v);
          if (!valid) {
            faild(r.message);
            break;
          }
        }
        if (r.pattern) {
          const valid = r.pattern.test(v);
          console.log(valid, "valid");
          if (!valid) {
            faild(r.message);
            break;
          }
        }
        validData.valid = true;
        validData.message = "校验通过";
      }
      validResult[prop] = validData;
    }
    return validData;
  }
  function triggerValidAll(data: {
    [key: keyof Rules]: any;
  }): [boolean, Array<IValidData>] {
    const validData: Array<IValidData> = [];
    const pass = !validData.some((item) => item.valid === false);
    for (const prop in data) {
      const valid = triggerValidProp(prop, data[prop]);
      validData.push(valid);
    }
    return [pass, validData];
  }
  return [validResult, triggerValidProp, triggerValidAll];
}
