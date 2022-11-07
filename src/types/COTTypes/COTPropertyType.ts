declare interface COTPropertyType {
  _id: ObjectId
  code: string,
  company: string,
  createdAt: string,
  isActive: boolean,
  modifiedAt: string,
  display: string 
  schemaNodes: COTPropertyTypeSchemaNode[] 
  viewPermissions: string[]
}


declare interface COTPropertyTypeSchemaNode {
  validators: COTPropertyTypeValidator,
  isArray: boolean,
  weight: number,
  isActive: boolean,
  key: string,
  display: string,
  description: string,
  basicType: string,
  subType: string
}

declare interface COTPropertyTypeValidator {
  required: boolean
}