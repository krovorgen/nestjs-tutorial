import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  job: string;

  @Prop([String])
  hobby: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
