import { ErrorType } from '@models/enums';

export class CustomError {
  constructor(public errorType: ErrorType, public errorMessage: string) {}
}
