export default function universalAction(type:any, payload?:any, options?:any) {
  return {
    type,
    payload,
    options
  };
}
