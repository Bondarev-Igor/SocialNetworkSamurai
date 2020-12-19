export const required = (value: any|undefined) => {
    if (value) return undefined;
    return "Field is required";
}

export const maxLengthCreator = (maxLength: number) => (value: any|undefined) => {
    if (value.length > maxLength) return `Max lenght is ${maxLength} symbols`;
    return undefined;
}