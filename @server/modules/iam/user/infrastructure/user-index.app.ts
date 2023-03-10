import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { EttUser } from './user.entity'
import { UserIndexRequest } from './user.request'

const tableName = 'user'
const tableKeys = ['name', 'email', 'role', 'phoneNumber']

export class UserIndexApp extends BaseIndexService {
  constructor(
    @InjectRepository(EttUser)
    private readonly userRepo: Repository<IUser>,
  ) {
    super()
  }

  additionalQuery(
    query: SelectQueryBuilder<IUser>,
    req: UserIndexRequest,
  ): SelectQueryBuilder<IUser> {
    if (req.role) {
      query.andWhere('user.role = :role', {
        role: req.role,
      })
    }

    return query
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IUser>> {
    const query = this.additionalQuery(
      this.userRepo.createQueryBuilder(tableName),
      req,
    )

    if (req.search) {
      query.andWhere(this.querySearch(tableName, tableKeys), {
        search: `%${req.search.toLowerCase()}%`,
      })
    }

    if (req.startAt && req.endAt) {
      query.andWhere(
        `CAST(${tableName}.updatedAt as DATE) BETWEEN CAST(:startAt AS DATE) AND CAST(:endAt AS DATE)`,
        { startAt: req.startAt, endAt: req.endAt },
      )
    }

    const sort = this.orderByKey(tableName, tableKeys, req.sort)
    const order = this.getOrder(req.order)
    query.orderBy(sort, order)
    query.take(this.take(req.perPage))
    query.skip(this.countOffset(req))

    const [data, count] = await query.getManyAndCount()

    return { data, meta: this.mapMeta(count, req) }
  }
}
