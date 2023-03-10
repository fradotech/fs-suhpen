import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Exception } from '@server/common/exceptions/index.exception'
import { config } from '@server/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUser } from '../../user/infrastructure/user.interface'
import { UserService } from '../../user/infrastructure/user.service'
import { IJwtPayload } from './jwt-payload-interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: config.auth.jwt.secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const { id } = payload
    const member = await this.userService.findOneOrFail(id)

    !member && Exception.unauthorized()

    return member
  }
}
