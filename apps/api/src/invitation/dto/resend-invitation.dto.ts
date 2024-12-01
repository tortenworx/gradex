import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ResendInvitationDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, {
    message: 'ID Number does not match with Regular Expression Validation',
  })
  id_number: string;
}
