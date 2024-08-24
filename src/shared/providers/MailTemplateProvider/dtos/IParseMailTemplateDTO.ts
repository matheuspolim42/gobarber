interface ITemplateVariables {
	[key: string]: string | number; // Qualquer item passado composto por uma string
}

export default interface IParseMailTemplateDTO {
	file: string;
	variables: ITemplateVariables;
}
