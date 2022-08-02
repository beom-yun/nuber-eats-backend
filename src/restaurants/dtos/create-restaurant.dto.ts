import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @IsString()
  @Field(type => String)
  @Length(5, 10)
  name: string;

  @IsBoolean()
  @Field(type => Boolean)
  isVegan: boolean;

  @IsString()
  @Field(type => String)
  address: string;

  @IsString()
  @Field(type => String)
  ownersName: string;
}
