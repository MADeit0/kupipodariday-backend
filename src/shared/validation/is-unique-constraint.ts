import { ValidationOptions, registerDecorator } from 'class-validator';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [tableName, column]: string[] = args.constraints;

    const exists = await this.entityManager
      .getRepository(tableName)
      .exist({ where: { [column]: value } });

    return exists ? false : true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const { property, value } = validationArguments;
    console.log(validationArguments);
    return `${property} "${value}" already exists. Choose another ${property}`;
  }
}

export type IsUniqueConstraintInput = {
  tableName: string;
  column: string;
};

export function IsUnique(
  tableName: string,
  column: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [tableName, column],
      validator: IsUniqueConstraint,
    });
  };
}
