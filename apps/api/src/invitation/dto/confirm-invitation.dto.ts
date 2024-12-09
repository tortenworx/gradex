import { IsMongoId, IsNotEmpty, IsObject, Matches } from 'class-validator';

class Credential {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class confirmInvitationDTO {
  @IsMongoId()
  @IsNotEmpty()
  invitationId: string;

  @Matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, {
    message: 'ID Number does not match with Regular Expression Validation',
  })
  @IsNotEmpty()
  id_number: string;

  @IsObject()
  credentials: Credential;
}
