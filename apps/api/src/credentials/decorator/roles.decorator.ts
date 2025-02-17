import { Reflector } from '@nestjs/core';
import { Role } from 'src/schemas/user.schema';


export const Roles = Reflector.createDecorator<string[]>();
