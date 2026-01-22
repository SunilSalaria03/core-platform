import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/enums/user.enum';
import { success } from '../../common/utils/response.utils';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
@Roles(UserRole.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    const data = this.adminService.getStats();
    return success(data, 'Admin stats fetched successfully', 200);
  }
}
